// React components
import React, { useState } from "react";

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

function BudgetReleaseTracker() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    const addNewRow = () => {
        setRows([...rows, { when: "", who: "", what: "", amount: "" }]);
    };

    const saveAsXLS = () => {
        let table = document.querySelector("table").outerHTML;
        let blob = new Blob([table], { type: "application/vnd.ms-excel" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "budget_tracker.xls";
        link.click();
    };

    const printForm = () => {
        window.print();
    };

    const updateDatabase = () => {
        alert("Database update functionality is not yet implemented.");
    };

    const columns = [
        { Header: "WHEN", accessor: "when" },
        { Header: "WHO", accessor: "who" },
        { Header: "WHAT", accessor: "what" },
        { Header: "AMOUNT RELEASED", accessor: "amount" },
    ];

    const data = rows.map((row, index) => ({
        when: (
            <MDInput
                value={row.when}
                onChange={(e) => handleInputChange(index, "when", e.target.value)}
                fullWidth
            />
        ),
        who: (
            <MDInput
                value={row.who}
                onChange={(e) => handleInputChange(index, "who", e.target.value)}
                fullWidth
            />
        ),
        what: (
            <MDInput
                value={row.what}
                onChange={(e) => handleInputChange(index, "what", e.target.value)}
                fullWidth
            />
        ),
        amount: (
            <MDInput
                value={row.amount}
                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                fullWidth
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
                            <SheetActionButtons sheetId="" />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default BudgetReleaseTracker;
