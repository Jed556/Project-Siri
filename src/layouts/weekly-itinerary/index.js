// React components
import { useState, useEffect } from "react";

// @mui material components
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Other components
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService
import { parseISO } from "date-fns"; // Import parseISO to handle date parsing

// Configs
import configs from "config";

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function WeeklyItinerary() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

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

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                setState({
                    week: values[2] && values[2][1] ? values[2][1] : "",
                    objectives: values[3] && values[3][1] ? values[3][1] : "",
                    deadlines: values[4] && values[4][1] ? values[4][1] : "",
                    dailyRemarks: {
                        Monday: {
                            date: values[5] && values[5][1] ? new Date(values[5][1]) : null,
                            remarks: values[5] && values[5][2] ? values[5][2] : "",
                        },
                        Tuesday: {
                            date: values[6] && values[6][1] ? new Date(values[6][1]) : null,
                            remarks: values[6] && values[6][2] ? values[6][2] : "",
                        },
                        Wednesday: {
                            date: values[7] && values[7][1] ? new Date(values[7][1]) : null,
                            remarks: values[7] && values[7][2] ? values[7][2] : "",
                        },
                        Thursday: {
                            date: values[8] && values[8][1] ? new Date(values[8][1]) : null,
                            remarks: values[8] && values[8][2] ? values[8][2] : "",
                        },
                        Friday: {
                            date: values[9] && values[9][1] ? new Date(values[9][1]) : null,
                            remarks: values[9] && values[9][2] ? values[9][2] : "",
                        },
                        Saturday: {
                            date: values[10] && values[10][1] ? new Date(values[10][1]) : null,
                            remarks: values[10] && values[10][2] ? values[10][2] : "",
                        },
                    },
                });
            });
        }
    };

    useEffect(() => {
        handleSheetChange();
    }, []);

    function formatTableData() {
        return {
            spreadsheetTitle: "Weekly Itinerary",
            sheetName: "Weekly Itinerary",
            fileName: `Weekly_Itinerary_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Weekly Itinerary",
            rows: [
                ["WEEKLY ITINERARY"],
                [""],
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
                            <SheetActionButtons
                                data={formatTableData()}
                                onSheetChange={handleSheetChange}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default WeeklyItinerary;
