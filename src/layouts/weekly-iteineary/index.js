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
import { format } from "prettier";
import { func } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function WeeklyIteineary() {
    const { columns, rows } = authorsTableData();
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

    function formatTableData() {
        return {
            name: `Weekly_Itinerary_${week}`,
            rows: Object.keys(dailyRemarks).map((day) => ({
                Day: day,
                Date: dailyRemarks[day].date,
                Remarks: dailyRemarks[day].remarks,
            })),
        };
    }

    function isValidDate(day, date) {
        const dayOfWeek = new Date(date).getDay();
        const dayMap = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
        };
        return dayMap[day] === dayOfWeek;
    }

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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                ].map((day) => (
                                    <MDBox pt={3} px={2} key={day}>
                                        <MDTypography variant="h6">
                                            {day.toUpperCase()}
                                        </MDTypography>
                                        <DatePicker
                                            value={dailyRemarks[day].date}
                                            onChange={(date) =>
                                                setDailyRemarks({
                                                    ...dailyRemarks,
                                                    [day]: {
                                                        ...dailyRemarks[day],
                                                        date: date,
                                                    },
                                                })
                                            }
                                            shouldDisableDate={(date) => !isValidDate(day, date)}
                                            renderInput={(params) => (
                                                <MDInput fullWidth {...params} />
                                            )}
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
                                                    [day]: {
                                                        ...dailyRemarks[day],
                                                        remarks: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </MDBox>
                                ))}
                            </LocalizationProvider>
                            <SheetActionButtons sheetId="" data={formatTableData()} />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default WeeklyIteineary;
