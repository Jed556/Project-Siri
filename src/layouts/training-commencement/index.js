// React components
import React, { useState, useEffect } from "react";
import { format, isValid, parse } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { useTheme } from "@mui/material/styles";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";

// Configs
import configs from "config";

import { useAuth } from "context/AuthContext";
import { getFormDocument } from "utils/firestoreService";

function TrainingCommencement() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();
    const theme = useTheme();

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "ACCOUNT", accessor: "account", placeholder: "Account Name", type: "text" },
        { Header: "TRAINING", accessor: "training", placeholder: "Training", type: "text" },
        {
            Header: "TRAINING DATE",
            accessor: "trainingDate",
            placeholder: "Training Date",
            type: "date",
        },
        { Header: "NO. OF DAYS", accessor: "noOfDays", placeholder: "No. of Days", type: "number" },
        { Header: "INCLUSIONS", accessor: "inclusions", placeholder: "Inclusions", type: "text" },
        {
            Header: "OFFICIAL RATE",
            accessor: "officialRate",
            placeholder: "Official Rate",
            type: "number",
        },
        {
            Header: "FEES BREAKDOWN",
            accessor: "feesBreakdown",
            placeholder: "Fees Breakdown",
            type: "text",
        },
        { Header: "REMARKS", accessor: "remarks", placeholder: "Remarks", type: "text" },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    const parseDateValue = (value) => {
        if (!value) return null;
        if (value instanceof Date && isValid(value)) return value;

        const parsedFromFormat = parse(value, "MM/dd/yyyy", new Date());
        if (isValid(parsedFromFormat)) return parsedFromFormat;

        const parsedNative = new Date(value);
        return isValid(parsedNative) ? parsedNative : null;
    };

    const formatDateValue = (value) => {
        if (!value) return "";
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
                    opacity: 0.35,
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
        openPickerButton: {
            sx: {
                color: `${theme.palette.text?.main || theme.palette.text.primary} !important`,
            },
        },
        textField: {
            placeholder: "MM/DD/YYYY",
            sx: {
                maxWidth: "180px",
                "& input": {
                    color: `${theme.palette.text?.main || theme.palette.text.primary} !important`,
                },
                "& .MuiSvgIcon-root": {
                    color: `${theme.palette.text?.main || theme.palette.text.primary} !important`,
                },
                "& .MuiInputAdornment-root .MuiIconButton-root": {
                    color: `${theme.palette.text?.main || theme.palette.text.primary} !important`,
                },
                "& .MuiInputAdornment-root .MuiIconButton-root .MuiSvgIcon-root": {
                    color: `${theme.palette.text?.main || theme.palette.text.primary} !important`,
                },
            },
        },
    };

    const createRowInputs = (rows, columns) => {
        const newData = rows.map((row, index) => {
            const rowData = {};
            columns.forEach((column) => {
                if (column.type === "date") {
                    rowData[column.accessor] = (
                        <DatePicker
                            value={parseDateValue(row[column.accessor])}
                            onChange={(date) =>
                                handleInputChange(index, column.accessor, formatDateValue(date))
                            }
                            format="MM/dd/yyyy"
                            slotProps={datePickerSlotProps}
                        />
                    );
                } else {
                    rowData[column.accessor] = (
                        <MDInput
                            fullWidth
                            type={column.type}
                            placeholder={column.placeholder}
                            value={row[column.accessor] || ""}
                            onChange={(e) =>
                                handleInputChange(index, column.accessor, e.target.value)
                            }
                        />
                    );
                }
            });
            return rowData;
        });
        setData(newData);
    };

    useEffect(() => {
        createRowInputs(rows, columns);
    }, [rows]);

    function formatTableData() {
        return {
            spreadsheetTitle: "Training_Commencement",
            sheetName: "Training_Commencement",
            fileName: `Training_Commencement_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Training Commencement",
            rows: [
                ["TRAINING COMMENCEMENT FORM"],
                [""],
                [
                    "Account",
                    "Training",
                    "Training Date",
                    "No. of Days",
                    "Inclusions",
                    "Official Rate",
                    "Fees Breakdown",
                    "Remarks",
                ],
                ...rows.map((row) => [
                    row.account || "",
                    row.training || "",
                    row.trainingDate || "",
                    row.noOfDays || "",
                    row.inclusions || "",
                    row.officialRate || "",
                    row.feesBreakdown || "",
                    row.remarks || "",
                ]),
            ],
            formData: { rows },
        };
    }

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") {
            setRows([{}]);
            return;
        }
        try {
            const docData = await getFormDocument(user.uid, "Training Commencement", docId);
            if (docData && docData.formData) {
                setRows(docData.formData.rows || [{}]);
            }
        } catch (err) {
            console.error("Failed to load document:", err);
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
                                bgColor={sidenavColor}
                                borderRadius="lg"
                                coloredShadow={sidenavColor}
                            >
                                <MDTypography variant="h6" color="white">
                                    Training Details
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DataTable
                                        table={{ columns, rows: data }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                </LocalizationProvider>
                            </MDBox>
                            <MDBox pt={3} px={2} textAlign="left">
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                            </MDBox>
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

export default TrainingCommencement;
