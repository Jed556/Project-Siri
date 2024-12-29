// React components
import { useState } from "react";

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

function BudgetRequest() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

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
                                bgColor={sidenavColor}
                                borderRadius="lg"
                                coloredShadow={sidenavColor}
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
