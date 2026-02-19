// React components
import { useState, useEffect } from "react";

// @mui material components
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isValid, parse } from "date-fns";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useTheme } from "@mui/material/styles";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Other components
import { useAuth } from "context/AuthContext";
import { getFormDocument } from "utils/firestoreService";
import { parseISO } from "date-fns"; // Import parseISO to handle date parsing

// Configs
import configs from "config";

function WeeklyItinerary() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();
    const theme = useTheme();

    const [state, setState] = useState({
        week: "",
        objectives: "",
        deadlines: "",
        dailyRemarks: {
            Monday: { date: null, remarks: "" },
            Tuesday: { date: null, remarks: "" },
            Wednesday: { date: null, remarks: "" },
            Thursday: { date: null, remarks: "" },
            Friday: { date: null, remarks: "" },
            Saturday: { date: null, remarks: "" },
        },
    });

    const parseDateValue = (value) => {
        if (!value) return null;
        if (value instanceof Date && isValid(value)) return value;

        const parsedFromFormat = parse(value, "MM/dd/yyyy", new Date());
        if (isValid(parsedFromFormat)) return parsedFromFormat;

        const parsedNative = new Date(value);
        return isValid(parsedNative) ? parsedNative : null;
    };

    const formatDateValue = (value) => {
        if (!value) return null;
        if (value instanceof Date && isValid(value)) return format(value, "MM/dd/yyyy");
        return value;
    };

    const datePickerSlotProps = {
        popper: {
            sx: {
                "& .MuiPickersDay-root": {
                    color: `${theme.palette.text.primary} !important`,
                },
            },
        },
        day: {
            sx: {
                color: `${theme.palette.text.primary} !important`,
                "&.Mui-disabled": {
                    opacity: 0.25,
                    color: `${theme.palette.text.disabled} !important`,
                },
                "&.Mui-focusVisible:not(.Mui-selected)": {
                    backgroundColor: "transparent !important",
                    boxShadow: "none !important",
                },
                "&.Mui-selected": {
                    backgroundColor: `${theme.palette.info.main} !important`,
                    color: `${theme.palette.common.white} !important`,
                },
                "&.Mui-selected:hover": {
                    backgroundColor: `${theme.palette.info.main} !important`,
                },
                "&.MuiPickersDay-today:not(.Mui-selected)": {
                    backgroundColor: "transparent !important",
                    border: `1px solid ${theme.palette.info.main} !important`,
                },
                "&.MuiPickersDay-today.Mui-selected": {
                    border: `1px solid ${theme.palette.common.white} !important`,
                },
            },
        },
        textField: {
            placeholder: "MM/DD/YYYY",
            sx: {
                maxWidth: "180px",
                "& input": {
                    color: `${theme.palette.text.primary} !important`,
                },
                "& .MuiSvgIcon-root": {
                    color: `${theme.palette.text.primary} !important`,
                },
                "& .MuiInputAdornment-root .MuiIconButton-root": {
                    color: `${theme.palette.text.primary} !important`,
                },
            },
        },
    };

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

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") return;
        try {
            const docData = await getFormDocument(user.uid, "Weekly Itinerary", docId);
            if (docData && docData.formData) {
                setState(docData.formData);
            }
        } catch (err) {
            console.error("Failed to load document:", err);
        }
    };

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
            formData: state,
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
                                            value={parseDateValue(state.dailyRemarks[day].date)}
                                            onChange={(date) =>
                                                handleInputChange(
                                                    "date",
                                                    formatDateValue(date),
                                                    day
                                                )
                                            }
                                            shouldDisableDate={(date) => !isValidDate(day, date)}
                                            slotProps={datePickerSlotProps}
                                            renderInput={(params) => (
                                                <MDInput
                                                    fullWidth
                                                    {...params}
                                                    sx={{
                                                        "& input": {
                                                            color: `${theme.palette.text.primary} !important`,
                                                        },
                                                        "& .MuiSvgIcon-root": {
                                                            color: `${theme.palette.text.primary} !important`,
                                                        },
                                                        "& .MuiInputAdornment-root .MuiIconButton-root": {
                                                            color: `${theme.palette.text.primary} !important`,
                                                        },
                                                    }}
                                                />
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
