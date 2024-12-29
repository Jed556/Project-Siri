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
import { useMaterialUIController } from "context";

import configs from "config";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useState, useEffect } from "react";
import { format } from "prettier";
import { func } from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns"; // Import parseISO to handle date parsing
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function WeeklyItinerary() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

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

    useEffect(() => {
        const currentSheetId = localStorage.getItem("currentSheetId");
        if (currentSheetId) {
            // Load the sheet data using the currentSheetId
            spreadsheetService.getSpreadsheetValues(currentSheetId, "Sheet1").then((response) => {
                const values = response.values || [];
                const newState = {
                    week: values[0] && values[0][1] ? values[0][1] : "",
                    objectives: values[1] && values[1][1] ? values[1][1] : "",
                    deadlines: values[2] && values[2][1] ? values[2][1] : "",
                    dailyRemarks: {
                        Monday: {
                            date: values[3] && values[3][1] ? parseISO(values[3][1]) : null,
                            remarks: values[3] && values[3][2] ? values[3][2] : "",
                        },
                        Tuesday: {
                            date: values[4] && values[4][1] ? parseISO(values[4][1]) : null,
                            remarks: values[4] && values[4][2] ? values[4][2] : "",
                        },
                        Wednesday: {
                            date: values[5] && values[5][1] ? parseISO(values[5][1]) : null,
                            remarks: values[5] && values[5][2] ? values[5][2] : "",
                        },
                        Thursday: {
                            date: values[6] && values[6][1] ? parseISO(values[6][1]) : null,
                            remarks: values[6] && values[6][2] ? values[6][2] : "",
                        },
                        Friday: {
                            date: values[7] && values[7][1] ? parseISO(values[7][1]) : null,
                            remarks: values[7] && values[7][2] ? values[7][2] : "",
                        },
                        Saturday: {
                            date: values[8] && values[8][1] ? parseISO(values[8][1]) : null,
                            remarks: values[8] && values[8][2] ? values[8][2] : "",
                        },
                    },
                };
                setState(newState);
            });
        }
    }, []);

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
            wbTitle: "Weekly Itinerary",
            sheetName: `Weekly_Itinerary_${state.week}`,
            fileName: `Weekly_Itinerary_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Weekly Itinerary",
            rows: [
                ["Week Covered", state.week],
                ["Objectives", state.objectives],
                ["Deadlines", state.deadlines],
                ...Object.keys(state.dailyRemarks).map((day) => [
                    day,
                    state.dailyRemarks[day].date
                        ? new Date(state.dailyRemarks[day].date).toLocaleDateString("en-US")
                        : "",
                    state.dailyRemarks[day].remarks,
                ]),
            ],
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
                                bgColor={sidenavColor}
                                borderRadius="lg"
                                coloredShadow={sidenavColor}
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
                            <SheetActionButtons data={formatTableData()} />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default WeeklyItinerary;
