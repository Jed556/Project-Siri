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
import DataTable from "examples/Tables/DataTable";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import configs from "config";
//    Data
// Data sources goes here

import { useState } from "react";

function BudgetRequest() {
    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "Category", accessor: "category" },
        { Header: "Mon", accessor: "mon" },
        { Header: "Tue", accessor: "tue" },
        { Header: "Wed", accessor: "wed" },
        { Header: "Thu", accessor: "thu" },
        { Header: "Fri", accessor: "fri" },
        { Header: "Sat", accessor: "sat" },
        { Header: "Sun", accessor: "sun" },
    ];

    const data = rows.map((row, index) => ({
        category: <MDInput fullWidth />,
        mon: <MDInput fullWidth />,
        tue: <MDInput fullWidth />,
        wed: <MDInput fullWidth />,
        thu: <MDInput fullWidth />,
        fri: <MDInput fullWidth />,
        sat: <MDInput fullWidth />,
        sun: <MDInput fullWidth />,
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
                                    Budget Request Form
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

export default BudgetRequest;
