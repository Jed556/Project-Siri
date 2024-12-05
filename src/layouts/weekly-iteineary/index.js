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

import { useState } from "react";
import axios from "axios";

function WeeklyIteineary() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [week, setWeek] = useState("");
  const [objectives, setObjectives] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [dailyRemarks, setDailyRemarks] = useState({
    Monday: { date: "", remarks: "" },
    Tuesday: { date: "", remarks: "" },
    Wednesday: { date: "", remarks: "" },
    Thursday: { date: "", remarks: "" },
    Friday: { date: "", remarks: "" },
    Saturday: { date: "", remarks: "" },
  });

  const handleSubmit = async () => {
    const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
    const data = {
      week,
      objectives,
      deadlines,
      dailyRemarks,
    };

    try {
      await axios.post(scriptURL, data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Weekly Schedule
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <MDTypography variant="h6">WEEK COVERED:</MDTypography>
                <MDInput
                  fullWidth
                  placeholder="Enter week"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                />
              </MDBox>
              <MDBox pt={3} px={2}>
                <MDTypography variant="h6">OBJECTIVES FOR THE WEEK</MDTypography>
                <MDInput
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter your weekly objectives here..."
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                />
              </MDBox>
              <MDBox pt={3} px={2}>
                <MDTypography variant="h6">DEADLINES FOR THE WEEK</MDTypography>
                <MDInput
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter your deadlines here..."
                  value={deadlines}
                  onChange={(e) => setDeadlines(e.target.value)}
                />
              </MDBox>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <MDBox pt={3} px={2} key={day}>
                  <MDTypography variant="h6">{day.toUpperCase()}</MDTypography>
                  <MDInput
                    fullWidth
                    type="date"
                    value={dailyRemarks[day].date}
                    onChange={(e) =>
                      setDailyRemarks({
                        ...dailyRemarks,
                        [day]: { ...dailyRemarks[day], date: e.target.value },
                      })
                    }
                  />
                  <MDInput
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Remarks"
                    value={dailyRemarks[day].remarks}
                    onChange={(e) =>
                      setDailyRemarks({
                        ...dailyRemarks,
                        [day]: { ...dailyRemarks[day], remarks: e.target.value },
                      })
                    }
                  />
                </MDBox>
              ))}
              <MDBox py={3} px={2} textAlign="center">
                <MDButton variant="contained" color="success" onClick={handleSubmit}>
                  Submit
                </MDButton>
                <MDButton
                  variant="contained"
                  color="info"
                  onClick={() => alert("Edit clicked")}
                  style={{ marginLeft: 10 }}
                >
                  Edit
                </MDButton>
                <MDButton
                  variant="contained"
                  color="primary"
                  onClick={() => window.print()}
                  style={{ marginLeft: 10 }}
                >
                  Print
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WeeklyIteineary;
