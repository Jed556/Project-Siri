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
import SheetActionButtons from "examples/Buttons";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useState } from "react";

function AnnualCorporateDistributionList() {
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
    no: <MDInput fullWidth />,
    company: <MDInput fullWidth />,
    recipient: <MDInput fullWidth />,
    designation: <MDInput fullWidth />,
    category1TypeA: <MDInput fullWidth />,
    category1TypeB: <MDInput fullWidth />,
    category1TypeC: <MDInput fullWidth />,
    category2TypeA: <MDInput fullWidth />,
    category2TypeB: <MDInput fullWidth />,
    category2TypeC: <MDInput fullWidth />,
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
                  Annual Corporate Distribution List
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{ columns, rows: data }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              <MDBox
                py={3}
                px={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                  Add New Row
                </MDButton>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDInput fullWidth label="Total Initial Request (AE Name)" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput fullWidth label="Add: Contingency" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput fullWidth label="Overall Total" />
                  </Grid>
                </Grid>
                <SheetActionButtons sheetId="" />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AnnualCorporateDistributionList;
