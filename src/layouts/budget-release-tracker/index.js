// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
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

function BudgetReleaseTracker() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "WHEN", accessor: "when", placeholder: "When", type: "text" },
        { Header: "WHO", accessor: "who", placeholder: "Who", type: "text" },
        { Header: "WHAT", accessor: "what", placeholder: "What", type: "text" },
        {
            Header: "AMOUNT RELEASED",
            accessor: "amount",
            placeholder: "Amount Released",
            type: "text",
        },
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
            spreadsheetTitle: "Budget_Release_Tracker",
            sheetName: "Budget_Release_Tracker",
            fileName: `Budget_Release_Tracker_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Budget Release Tracker",
            rows: [
                ["BUDGET RELEASE TRACKER"],
                [""],
                ["When", "Who", "What", "Amount Released"],
                ...rows.map((row) => [
                    row.when || "",
                    row.who || "",
                    row.what || "",
                    row.amount || "",
                ]),
            ],
        };
    }

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                const updatedRows = values.slice(3).map((row) => ({
                    when: row[0] || "",
                    who: row[1] || "",
                    what: row[2] || "",
                    amount: row[3] || "",
                }));

                setRows(updatedRows);
            });
        }
    };

    useEffect(() => {
        handleSheetChange();
    }, []);

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
                                    Budget Release Tracker
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

export default BudgetReleaseTracker;
