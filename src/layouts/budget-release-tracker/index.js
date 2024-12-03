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

function BudgetReleaseTracker() {
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Budget Release Tracker
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <form>
                  <DataTable
                    table={{ columns, rows: data }}
                    entriesPerPage={false}
                    canSearch={false}
                    showTotalEntries={false}
                    isSorted={false}
                    noEndBorder
                  />
                </form>
                <MDBox pt={3} px={2} textAlign="left">
                  <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                    Add New Row
                  </MDButton>
                </MDBox>
                <MDBox pt={3} pb={3} textAlign="center">
                  <MDButton variant="contained" color="success" onClick={saveAsXLS}>
                    Save as XLS
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color="info"
                    onClick={printForm}
                    style={{ marginLeft: 10 }}
                  >
                    Print
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color="primary"
                    onClick={updateDatabase}
                    style={{ marginLeft: 10 }}
                  >
                    Update Database
                  </MDButton>
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

export default BudgetReleaseTracker;
