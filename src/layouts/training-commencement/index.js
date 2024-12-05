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
import SheetActionButtons from "examples/Buttons";

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

  const saveAsXLS = () => {
    // Implement save as XLS functionality
  };

  const printForm = () => {
    window.print();
  };

  const submitToGoogleSheet = () => {
    // Implement submit to Google Sheets functionality
  };

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

  const data = rows.map((_, index) => ({
    account: <MDInput fullWidth placeholder="Account" />,
    training: <MDInput fullWidth placeholder="Training" />,
    trainingDate: <MDInput fullWidth type="date" />,
    noOfDays: <MDInput fullWidth type="number" placeholder="No. of Days" />,
    inclusions: <MDInput fullWidth placeholder="Inclusions" />,
    officialRate: <MDInput fullWidth type="number" placeholder="Official Rate" />,
    feesBreakdown: <MDInput fullWidth placeholder="Fees Breakdown" />,
    remarks: <MDInput fullWidth placeholder="Remarks" />,
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
                  Training Commencement Coordination
                </MDTypography>
                <MDTypography variant="subtitle1" color="white">
                  Training Details for September 2024
                </MDTypography>
              </MDBox>
              <SheetActionButtons sheetId="" />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TrainingCommencement;
