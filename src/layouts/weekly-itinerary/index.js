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
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import configs from "config";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useState } from "react";
import { format } from "prettier";
import { func } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function WeeklyItinerary() {
    const { columns, rows } = authorsTableData();
    const [state, setState] = useState({
        week: "",
        objectives: "",
        deadlines: "",
        dailyRemarks: {
            Monday: { date: "", remarks: "" },
            Tuesday: { date: "", remarks: "" },
            Wednesday: { date: "", remarks: "" },
            Thursday: { date: "", remarks: "" },
            Friday: { date: "", remarks: "" },
            Saturday: { date: "", remarks: "" },
        },
    });

    const handleInputChange = (field, value, day = null) => {
        if (day) {
            setState((prevState) => ({
                ...prevState,
                dailyRemarks: {
                    ...prevState.dailyRemarks,
                    [day]: {
                        ...prevState.dailyRemarks[day],
                        [field]: value,
                    },
                },
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }
    };

    function formatTableData() {
        return {
            name: `Weekly_Itinerary_${state.week}`,
            rows: Object.keys(state.dailyRemarks).map((day) => ({
                Day: day,
                Date: state.dailyRemarks[day].date,
                Remarks: state.dailyRemarks[day].remarks,
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
                                    value={state.week}
                                    onChange={(e) => handleInputChange("week", e.target.value)}
                                />
                            </MDBox>
                            <MDBox pt={3} px={2}>
                                <MDTypography variant="h6">OBJECTIVES FOR THE WEEK</MDTypography>
                                <MDInput
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter your weekly objectives here..."
                                    value={state.objectives}
                                    onChange={(e) =>
                                        handleInputChange("objectives", e.target.value)
                                    }
                                />
                            </MDBox>
                            <MDBox pt={3} px={2}>
                                <MDTypography variant="h6">DEADLINES FOR THE WEEK</MDTypography>
                                <MDInput
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter your deadlines here..."
                                    value={state.deadlines}
                                    onChange={(e) => handleInputChange("deadlines", e.target.value)}
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
                                            value={state.dailyRemarks[day].date}
                                            onChange={(date) =>
                                                handleInputChange("date", date, day)
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
                                            value={state.dailyRemarks[day].remarks}
                                            onChange={(e) =>
                                                handleInputChange("remarks", e.target.value, day)
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
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default WeeklyItinerary;
