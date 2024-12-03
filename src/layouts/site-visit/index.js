/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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

import React, { useState } from "react";

function SiteVisitForm() {
  const [clientRows, setClientRows] = useState([{}, {}]);
  const [actionRows, setActionRows] = useState([{}]);

  const addClientRow = () => {
    setClientRows([...clientRows, {}]);
  };

  const addActionRow = () => {
    setActionRows([...actionRows, {}]);
  };

  const saveToExcel = () => {
    // Implement save to Excel functionality
  };

  const saveToDatabase = () => {
    // Implement save to database functionality
  };

  const clientColumns = [
    { Header: "#", accessor: "index" },
    { Header: "Name", accessor: "name" },
    { Header: "Designation", accessor: "designation" },
  ];

  const clientData = clientRows.map((_, index) => ({
    index: index + 1,
    name: <MDInput fullWidth name={`name${index + 1}`} />,
    designation: <MDInput fullWidth name={`designation${index + 1}`} />,
  }));

  const actionColumns = [
    { Header: "Action Items", accessor: "action" },
    { Header: "Target Date", accessor: "targetDate" },
    { Header: "P/C", accessor: "pc" },
    { Header: "Status", accessor: "status" },
  ];

  const actionData = actionRows.map((_, index) => ({
    action: <MDInput fullWidth name={`action${index + 1}`} />,
    targetDate: <MDInput fullWidth type="date" name={`targetDate${index + 1}`} />,
    pc: <MDInput fullWidth name={`pc${index + 1}`} />,
    status: <MDInput fullWidth name={`status${index + 1}`} />,
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
                  Site Visit Form
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <form id="siteVisitForm">
                  <MDBox mb={2}>
                    <MDTypography variant="h6">Date:</MDTypography>
                    <MDInput fullWidth type="date" name="date" required />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6">School/Company/Organization:</MDTypography>
                    <MDInput fullWidth name="organization" required />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6">Client Attendees</MDTypography>
                    <DataTable
                      table={{ columns: clientColumns, rows: clientData }}
                      entriesPerPage={false}
                      canSearch={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                    <MDButton variant="contained" color="secondary" onClick={addClientRow}>
                      Add Client Row
                    </MDButton>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6">Notes:</MDTypography>
                    <MDInput fullWidth multiline rows={4} name="notes" />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6">Action Items</MDTypography>
                    <DataTable
                      table={{ columns: actionColumns, rows: actionData }}
                      entriesPerPage={false}
                      canSearch={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                    <MDButton variant="contained" color="secondary" onClick={addActionRow}>
                      Add Action Row
                    </MDButton>
                  </MDBox>
                  <MDBox textAlign="center" pb={3}>
                    <MDButton variant="contained" color="success" onClick={saveToExcel}>
                      Save to Excel
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="info"
                      onClick={() => window.print()}
                      style={{ marginLeft: 10 }}
                    >
                      Print Form
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="primary"
                      onClick={saveToDatabase}
                      style={{ marginLeft: 10 }}
                    >
                      Save to Database
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="warning"
                      type="reset"
                      style={{ marginLeft: 10 }}
                    >
                      Clear Form
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SiteVisitForm;
