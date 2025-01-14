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

function SummaryOfAccounts() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const columns = [
        { Header: "Account", accessor: "account" },
        { Header: "SOA No.", accessor: "soa_no" },
        { Header: "SOA Date", accessor: "soa_date" },
        { Header: "Training", accessor: "training" },
        { Header: "Training Date", accessor: "training_date" },
        { Header: "No. of Pax", accessor: "no_of_pax" },
        { Header: "Amount Billed", accessor: "amount_billed" },
        { Header: "Amount Collected", accessor: "amount_collected" },
        { Header: "Base Fee", accessor: "base_fee" },
        { Header: "Disc or MU", accessor: "disc_or_mu" },
        { Header: "AF-R", accessor: "af_r" },
        { Header: "AF", accessor: "af" },
        { Header: "Training Fee", accessor: "training_fee" },
        { Header: "Meals & Accom", accessor: "meals_and_accom" },
    ];

    const rows = [
        {
            account: "Account 1",
            soa_no: "SOA001",
            soa_date: "2023-10-01",
            training: "Training 1",
            training_date: "2023-10-05",
            no_of_pax: 10,
            amount_billed: 1000,
            amount_collected: 800,
            base_fee: 500,
            disc_or_mu: 50,
            af_r: 100,
            af: 150,
            training_fee: 200,
            meals_and_accom: 100,
        },
        {
            account: "Account 2",
            soa_no: "SOA002",
            soa_date: "2023-10-02",
            training: "Training 2",
            training_date: "2023-10-06",
            no_of_pax: 15,
            amount_billed: 1500,
            amount_collected: 1200,
            base_fee: 700,
            disc_or_mu: 70,
            af_r: 150,
            af: 200,
            training_fee: 250,
            meals_and_accom: 130,
        },
        // Add more rows as needed
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

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
                                    Summary of Accounts
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

export default SummaryOfAccounts;
