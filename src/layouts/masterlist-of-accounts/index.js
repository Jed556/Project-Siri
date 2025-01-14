// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
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

function MasterlistOfAccounts() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "ACCOUNT", accessor: "account", placeholder: "Account Name", type: "text" },
        {
            Header: "CONTACT PERSON",
            accessor: "contactPerson",
            placeholder: "Contact Person",
            type: "text",
        },
        { Header: "POSITION", accessor: "position", placeholder: "Position", type: "text" },
        {
            Header: "ADDRESS (Street City, Province)",
            accessor: "address",
            placeholder: "Address",
            type: "text",
        },
        { Header: "CONTACT NO.", accessor: "contactNo", placeholder: "Contact No.", type: "text" },
        { Header: "E-MAIL", accessor: "email", placeholder: "E-mail", type: "email" },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    const createRowInputs = (rows, columns) => {
        const newData = rows.map((row, index) => {
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
        createRowInputs(rows, columns);
    }, [rows]);

    function formatTableData() {
        return {
            spreadsheetTitle: "Masterlist_Of_Accounts",
            sheetName: "Masterlist_Of_Accounts",
            fileName: `Masterlist_Of_Accounts_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Masterlist Of Accounts",
            rows: [
                ["Account", "Contact Person", "Position", "Address", "Contact No.", "E-mail"],
                ...rows.map((row) => [
                    row.account || "",
                    row.contactPerson || "",
                    row.position || "",
                    row.address || "",
                    row.contactNo || "",
                    row.email || "",
                ]),
            ],
        };
    }

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                const updatedRows = values.slice(1).map((row) => ({
                    account: row[0] || "",
                    contactPerson: row[1] || "",
                    position: row[2] || "",
                    address: row[3] || "",
                    contactNo: row[4] || "",
                    email: row[5] || "",
                }));

                setRows(updatedRows);
            });
        }
    };
    handleSheetChange();

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
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
                                    Masterlist of Accounts
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2}>
                                <DataTable
                                    table={{ columns, rows: data }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                            <MDBox pt={3} px={2} textAlign="left">
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                            </MDBox>
                            <SheetActionButtons
                                data={formatTableData()}
                                onSheetChange={handleSheetChange}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default MasterlistOfAccounts;
