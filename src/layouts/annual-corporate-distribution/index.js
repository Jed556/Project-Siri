// React components
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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

function AnnualCorporateDistributionList() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "No.", accessor: "no" },
        { Header: "Company", accessor: "company" },
        { Header: "Recipient / Name", accessor: "recipient" },
        { Header: "Designation", accessor: "designation" },
        { Header: "Category 1 (Type A)", accessor: "category1TypeA" },
        { Header: "Category 1 (Type B)", accessor: "category1TypeB" },
        { Header: "Category 1 (Type C)", accessor: "category1TypeC" },
        { Header: "Category 2 (Type A)", accessor: "category2TypeA" },
        { Header: "Category 2 (Type B)", accessor: "category2TypeB" },
        { Header: "Category 2 (Type C)", accessor: "category2TypeC" },
    ];

    const data = rows.map((row, index) => ({
        no: <MDInput fullWidth placeholder={`No. ${index + 1}`} />,
        company: <MDInput fullWidth placeholder="Company" />,
        recipient: <MDInput fullWidth placeholder="Recipient / Name" />,
        designation: <MDInput fullWidth placeholder="Designation" />,
        category1TypeA: <MDInput fullWidth placeholder="Category 1 (Type A)" />,
        category1TypeB: <MDInput fullWidth placeholder="Category 1 (Type B)" />,
        category1TypeC: <MDInput fullWidth placeholder="Category 1 (Type C)" />,
        category2TypeA: <MDInput fullWidth placeholder="Category 2 (Type A)" />,
        category2TypeB: <MDInput fullWidth placeholder="Category 2 (Type B)" />,
        category2TypeC: <MDInput fullWidth placeholder="Category 2 (Type C)" />,
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
                                    Annual Corporate Distribution List
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
                            <MDBox
                                pt={3}
                                px={2}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                            </MDBox>
                            <MDBox pt={5} px={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Total Initial Request (AE Name)"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Add: Contingency" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput fullWidth label="Overall Total" />
                                    </Grid>
                                </Grid>
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

export default AnnualCorporateDistributionList;
