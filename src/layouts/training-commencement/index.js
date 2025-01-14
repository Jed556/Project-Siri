// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

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

function TrainingCommencement() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "ACCOUNT", accessor: "account", placeholder: "Account Name", type: "text" },
        { Header: "TRAINING", accessor: "training", placeholder: "Training", type: "text" },
        {
            Header: "TRAINING DATE",
            accessor: "trainingDate",
            placeholder: "Training Date",
            type: "date",
        },
        { Header: "NO. OF DAYS", accessor: "noOfDays", placeholder: "No. of Days", type: "number" },
        { Header: "INCLUSIONS", accessor: "inclusions", placeholder: "Inclusions", type: "text" },
        {
            Header: "OFFICIAL RATE",
            accessor: "officialRate",
            placeholder: "Official Rate",
            type: "number",
        },
        {
            Header: "FEES BREAKDOWN",
            accessor: "feesBreakdown",
            placeholder: "Fees Breakdown",
            type: "text",
        },
        { Header: "REMARKS", accessor: "remarks", placeholder: "Remarks", type: "text" },
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
            spreadsheetTitle: "Training_Commencement",
            sheetName: "Training_Commencement",
            fileName: `Training_Commencement_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Training Commencement",
            rows: [
                [
                    "Account",
                    "Training",
                    "Training Date",
                    "No. of Days",
                    "Inclusions",
                    "Official Rate",
                    "Fees Breakdown",
                    "Remarks",
                ],
                ...rows.map((row) => [
                    row.account || "",
                    row.training || "",
                    row.trainingDate || "",
                    row.noOfDays || "",
                    row.inclusions || "",
                    row.officialRate || "",
                    row.feesBreakdown || "",
                    row.remarks || "",
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
                    training: row[1] || "",
                    trainingDate: row[2] || "",
                    noOfDays: row[3] || "",
                    inclusions: row[4] || "",
                    officialRate: row[5] || "",
                    feesBreakdown: row[6] || "",
                    remarks: row[7] || "",
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
                                    Training Details
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

export default TrainingCommencement;
