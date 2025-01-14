// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";

// Configs
import configs from "config";
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function PurchaseOrder() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [items, setItems] = useState([{}]);
    const [data, setData] = useState([]);
    const [orderDetails, setOrderDetails] = useState({
        poNumber: "",
        date: "",
        paymentTerms: "",
        supplierName: "",
        address: "",
        delivery: "",
        attention: "",
        pickUp: "",
    });
    const [bottomDetails, setBottomDetails] = useState({
        preparedBy: "",
        approvedBy: "",
        receivedBy: "",
        supplierDate: "",
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

    const addNewRow = () => {
        setItems([...items, {}]);
    };

    const columns = [
        { Header: "Item #", accessor: "itemNumber", placeholder: "Item #", type: "text" },
        {
            Header: "Description",
            accessor: "description",
            placeholder: "Description",
            type: "text",
        },
        { Header: "Qty", accessor: "quantity", placeholder: "Qty", type: "number" },
        { Header: "Unit", accessor: "unit", placeholder: "Unit", type: "text" },
        { Header: "Unit Price", accessor: "unitPrice", placeholder: "Unit Price", type: "number" },
        { Header: "Amount", accessor: "amount", placeholder: "Amount", type: "number" },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = items.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setItems(updatedRows);
    };

    const createRowInputs = (items, columns) => {
        const newData = items.map((row, index) => {
            const rowData = {};
            columns.forEach((column) => {
                rowData[column.accessor] = (
                    <MDInput
                        fullWidth
                        type={column.type}
                        placeholder={column.placeholder}
                        value={row[column.accessor] || ""}
                        onChange={(e) => handleInputChange(index, column.accessor, e.target.value)}
                    />
                );
            });
            return rowData;
        });
        setData(newData);
    };

    useEffect(() => {
        createRowInputs(items, columns);
    }, [items]);

    const handleOrderDetailsChange = (field, value) => {
        setOrderDetails((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleBottomDetailsChange = (field, value) => {
        setBottomDetails((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    function formatTableData() {
        return {
            spreadsheetTitle: "Purchase_Order",
            sheetName: "Purchase_Order",
            fileName: `Purchase_Order_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Purchase Order",
            rows: [
                ["Order Details"],
                ["P.O. #", orderDetails.poNumber, "Date", orderDetails.date],
                ["Payment Terms", orderDetails.paymentTerms],
                ["Supplier Name", orderDetails.supplierName],
                ["Address", orderDetails.address],
                ["Delivery", orderDetails.delivery],
                ["Attention", orderDetails.attention, "Pick-Up/Look For", orderDetails.pickUp],
                [""],
                ["ITEMS"],
                ["Item #", "Description", "Qty", "Unit", "Unit Price", "Amount"],
                ...items.map((row) => [
                    row.itemNumber || "",
                    row.description || "",
                    row.quantity || "",
                    row.unit || "",
                    row.unitPrice || "",
                    row.amount || "",
                ]),
                [""],
                ["Total Amount (PHP):", calculateTotal(items)],
                [
                    "Prepared By",
                    bottomDetails.preparedBy,
                    "Approved By",
                    bottomDetails.approvedBy,
                ],
                [
                    "Received By",
                    bottomDetails.receivedBy,
                    "Supplier/Date",
                    bottomDetails.supplierDate,
                ],
            ],
        };
    }

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                const orderDetails = {
                    poNumber: values[1][1] || "",
                    date: values[1][3] || "",
                    paymentTerms: values[2][1] || "",
                    supplierName: values[3][1] || "",
                    address: values[4][1] || "",
                    delivery: values[5][1] || "",
                    attention: values[6][1] || "",
                    pickUp: values[6][3] || "",
                };
                const items = values.slice(8, values.length - 3).map((row) => ({
                    itemNumber: row[0] || "",
                    description: row[1] || "",
                    quantity: row[2] || "",
                    unit: row[3] || "",
                    unitPrice: row[4] || "",
                    amount: row[5] || "",
                }));
                const bottomDetails = {
                    preparedBy: values[values.length - 2][1] || "",
                    approvedBy: values[values.length - 2][3] || "",
                    receivedBy: values[values.length - 1][1] || "",
                    supplierDate: values[values.length - 1][3] || "",
                };

                setOrderDetails(orderDetails);
                setItems(items);
                setBottomDetails(bottomDetails);
            });
        }
    };

    const calculateTotal = (items) => {
        if (!items || items.length === 0) return 0;
        return items.reduce((total, row) => {
            const amount = parseFloat(row.amount) || 0;
            const unitPrice = parseFloat(row.unitPrice) || 0;
            return total + amount * unitPrice;
        }, 0);
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: "", color: "success" });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={0}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor={sidenavColor}
                                borderRadius="lg"
                                coloredShadow={sidenavColor}
                            >
                                <MDTypography variant="h6" color="white">
                                    Order Details
                                </MDTypography>
                            </MDBox>
                            <MDBox py={3} px={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="P.O. #"
                                            value={orderDetails.poNumber}
                                            onChange={(e) =>
                                                handleOrderDetailsChange("poNumber", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            type="text"
                                            label="Date"
                                            value={orderDetails.date}
                                            onChange={(e) =>
                                                handleOrderDetailsChange("date", e.target.value)
                                            }
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput
                                            fullWidth
                                            label="Payment Terms"
                                            value={orderDetails.paymentTerms}
                                            onChange={(e) =>
                                                handleOrderDetailsChange(
                                                    "paymentTerms",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput
                                            fullWidth
                                            label="Supplier Name"
                                            value={orderDetails.supplierName}
                                            onChange={(e) =>
                                                handleOrderDetailsChange(
                                                    "supplierName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Address"
                                            value={orderDetails.address}
                                            onChange={(e) =>
                                                handleOrderDetailsChange("address", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Delivery"
                                            value={orderDetails.delivery}
                                            onChange={(e) =>
                                                handleOrderDetailsChange("delivery", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Attention"
                                            value={orderDetails.attention}
                                            onChange={(e) =>
                                                handleOrderDetailsChange(
                                                    "attention",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Pick-Up/Look For"
                                            value={orderDetails.pickUp}
                                            onChange={(e) =>
                                                handleOrderDetailsChange("pickUp", e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor={sidenavColor}
                                borderRadius="lg"
                                coloredShadow={sidenavColor}
                            >
                                <MDTypography variant="h6" color="white">
                                    Items
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} px={2}>
                                <DataTable
                                    table={{ columns, rows: data }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                            <MDBox
                                py={3}
                                px={3}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                                <MDTypography variant="h6">
                                    Total Amount (PHP): {calculateTotal(items)}
                                </MDTypography>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox py={3} px={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Prepared By"
                                            value={bottomDetails.preparedBy}
                                            onChange={(e) =>
                                                handleBottomDetailsChange(
                                                    "preparedBy",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Approved By"
                                            value={bottomDetails.approvedBy}
                                            onChange={(e) =>
                                                handleBottomDetailsChange(
                                                    "approvedBy",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Received By"
                                            value={bottomDetails.receivedBy}
                                            onChange={(e) =>
                                                handleBottomDetailsChange(
                                                    "receivedBy",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Supplier/Date"
                                            type="text"
                                            value={bottomDetails.supplierDate}
                                            onChange={(e) =>
                                                handleBottomDetailsChange(
                                                    "supplierDate",
                                                    e.target.value
                                                )
                                            }
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                        <SheetActionButtons
                            data={formatTableData()}
                            onSheetChange={handleSheetChange}
                        />
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />

            <MDSnackbar
                color={snackbar.color}
                icon={snackbar.color === "success" ? "check" : "error"}
                title={snackbar.color === "success" ? "Success" : "Error"}
                content={snackbar.message}
                open={snackbar.open}
                onClose={closeSnackbar}
                close={closeSnackbar}
                bgWhite
            />
        </DashboardLayout>
    );
}

export default PurchaseOrder;
