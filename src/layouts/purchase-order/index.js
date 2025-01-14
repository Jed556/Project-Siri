// React components
import React, { useState } from "react";

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

function PurchaseOrder() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "success" });

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const saveForm = () => {
        // Example condition for error
        if (rows.length === 0) {
            setSnackbar({ open: true, message: "Error: No rows to save!", color: "error" });
        } else {
            setSnackbar({ open: true, message: "Form saved successfully!", color: "success" });
        }
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: "", color: "success" });
    };

    const calculateTotal = () => {
        return rows.reduce((total, row) => {
            const amount = parseFloat(row.amount) || 0;
            return total + amount;
        }, 0);
    };

    const columns = [
        { Header: "Item #", accessor: "itemNumber" },
        { Header: "Description", accessor: "description" },
        { Header: "Qty", accessor: "quantity" },
        { Header: "Unit", accessor: "unit" },
        { Header: "Unit Price", accessor: "unitPrice" },
        { Header: "Amount", accessor: "amount" },
    ];

    const data = rows.map((row, index) => ({
        itemNumber: <MDInput fullWidth />,
        description: <MDInput fullWidth />,
        quantity: <MDInput fullWidth type="number" />,
        unit: <MDInput fullWidth />,
        unitPrice: <MDInput fullWidth type="number" />,
        amount: <MDInput fullWidth type="number" />,
    }));

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
                                        <MDInput fullWidth label="P.O. #" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            type="text"
                                            label="Date"
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput fullWidth label="Payment Terms" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput fullWidth label="Supplier Name" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Address" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Delivery" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Attention" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Pick-Up/Look For" />
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
                                    Total Amount (PHP): {calculateTotal()}
                                </MDTypography>
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox py={3} px={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Prepared By" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Approved By" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Received By" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Supplier/Date"
                                            type="text"
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                        <SheetActionButtons sheetId="" />
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company="" />

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
