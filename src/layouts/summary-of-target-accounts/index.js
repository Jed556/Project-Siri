// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";

// Configs
import configs from "config";

function SummaryOfTargetAccounts() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const columns = [
        { Header: "AE", accessor: "ae" },
        { Header: "Address", accessor: "address" },
        { Header: "Region", accessor: "region" },
        { Header: "Name of Account", accessor: "name_of_account" },
        { Header: "Type", accessor: "type" },
        { Header: "Status", accessor: "status" },
        { Header: "Program Offering", accessor: "program_offering" },
        { Header: "Contact Person", accessor: "contact_person" },
        { Header: "Designation", accessor: "designation" },
        { Header: "Contact Number", accessor: "contact_number" },
    ];

    const rows = [
        {
            ae: "",
            address: "Angeles City",
            region: "03-Central Luzon",
            name_of_account: "",
            type: "Private",
            status: "Initial Visit",
            program_offering: "Hospitality and Tourism",
            contact_person: "",
            designation: "",
            contact_number: "",
        },
        // Add more rows as needed
    ];

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
                                    Summary of Target Accounts
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} pb={3} px={2}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company="" />
        </DashboardLayout>
    );
}

export default SummaryOfTargetAccounts;
