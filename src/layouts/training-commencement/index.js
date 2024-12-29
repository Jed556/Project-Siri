// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import configs from "config";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import React, { useState } from "react";
import DataTable from "examples/Tables/DataTable";

function TrainingCommencement() {
    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    function formatTableData() {
        return {
            name: "Training_Commencement",
            rows: rows.map((row) => ({
                Account: row.account || "",
                Training: row.training || "",
                "Training Date": row.trainingDate || "",
                "No. of Days": row.noOfDays || "",
                Inclusions: row.inclusions || "",
                "Official Rate": row.officialRate || "",
                "Fees Breakdown": row.feesBreakdown || "",
                Remarks: row.remarks || "",
            })),
        };
    }

    const columns = [
        { Header: "ACCOUNT", accessor: "account" },
        { Header: "TRAINING", accessor: "training" },
        { Header: "TRAINING DATE", accessor: "trainingDate" },
        { Header: "NO. OF DAYS", accessor: "noOfDays" },
        { Header: "INCLUSIONS", accessor: "inclusions" },
        { Header: "OFFICIAL RATE", accessor: "officialRate" },
        { Header: "FEES BREAKDOWN", accessor: "feesBreakdown" },
        { Header: "REMARKS", accessor: "remarks" },
    ];

    const data = rows.map((row, index) => ({
        account: (
            <MDInput
                fullWidth
                placeholder="Account"
                value={row.account || ""}
                onChange={(e) => handleInputChange(index, "account", e.target.value)}
            />
        ),
        training: (
            <MDInput
                fullWidth
                placeholder="Training"
                value={row.training || ""}
                onChange={(e) => handleInputChange(index, "training", e.target.value)}
            />
        ),
        trainingDate: (
            <MDInput
                fullWidth
                type="date"
                value={row.trainingDate || ""}
                onChange={(e) => handleInputChange(index, "trainingDate", e.target.value)}
            />
        ),
        noOfDays: (
            <MDInput
                fullWidth
                type="number"
                placeholder="No. of Days"
                value={row.noOfDays || ""}
                onChange={(e) => handleInputChange(index, "noOfDays", e.target.value)}
            />
        ),
        inclusions: (
            <MDInput
                fullWidth
                placeholder="Inclusions"
                value={row.inclusions || ""}
                onChange={(e) => handleInputChange(index, "inclusions", e.target.value)}
            />
        ),
        officialRate: (
            <MDInput
                fullWidth
                type="number"
                placeholder="Official Rate"
                value={row.officialRate || ""}
                onChange={(e) => handleInputChange(index, "officialRate", e.target.value)}
            />
        ),
        feesBreakdown: (
            <MDInput
                fullWidth
                placeholder="Fees Breakdown"
                value={row.feesBreakdown || ""}
                onChange={(e) => handleInputChange(index, "feesBreakdown", e.target.value)}
            />
        ),
        remarks: (
            <MDInput
                fullWidth
                placeholder="Remarks"
                value={row.remarks || ""}
                onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
            />
        ),
    }));

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
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
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
                            <SheetActionButtons sheetId="" data={formatTableData()} />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default TrainingCommencement;
