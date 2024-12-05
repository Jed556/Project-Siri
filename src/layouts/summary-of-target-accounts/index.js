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

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function SummaryOfTargetAccounts() {
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
              <MDBox p={3}>
                <MDTypography variant="h4">Summary of Target Accounts</MDTypography>
                <MDBox mt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SummaryOfTargetAccounts;
