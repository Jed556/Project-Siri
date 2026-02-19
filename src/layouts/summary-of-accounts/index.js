// React components
import React, { useState, useEffect } from "react";
import { format, isValid, parse } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
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

function SummaryOfAccounts() {
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
        { Header: "Account", accessor: "account", placeholder: "Account", type: "text" },
        { Header: "SOA No.", accessor: "soa_no", placeholder: "SOA No.", type: "text" },
        { Header: "SOA Date", accessor: "soa_date", placeholder: "SOA Date", type: "date" },
        { Header: "Training", accessor: "training", placeholder: "Training", type: "text" },
        {
            Header: "Training Date",
            accessor: "training_date",
            placeholder: "Training Date",
            type: "date",
        },
        { Header: "No. of Pax", accessor: "no_of_pax", placeholder: "No. of Pax", type: "number" },
        {
            Header: "Amount Billed",
            accessor: "amount_billed",
            placeholder: "Amount Billed",
            type: "number",
        },
        {
            Header: "Amount Collected",
            accessor: "amount_collected",
            placeholder: "Amount Collected",
            type: "number",
        },
        { Header: "Base Fee", accessor: "base_fee", placeholder: "Base Fee", type: "number" },
        { Header: "Disc or MU", accessor: "disc_or_mu", placeholder: "Disc or MU", type: "number" },
        { Header: "AF-R", accessor: "af_r", placeholder: "AF-R", type: "number" },
        { Header: "AF", accessor: "af", placeholder: "AF", type: "number" },
        {
            Header: "Training Fee",
            accessor: "training_fee",
            placeholder: "Training Fee",
            type: "number",
        },
        {
            Header: "Meals & Accom",
            accessor: "meals_and_accom",
            placeholder: "Meals & Accom",
            type: "number",
        },
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
            spreadsheetTitle: "Summary_of_Accounts",
            sheetName: "Summary_of_Accounts",
            fileName: `Summary_of_Accounts_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Summary of Accounts",
            rows: [
                ["SUMMARY OF ACCOUNTS"],
                [""],
                [
                    "Account",
                    "SOA No.",
                    "SOA Date",
                    "Training",
                    "Training Date",
                    "No. of Pax",
                    "Amount Billed",
                    "Amount Collected",
                    "Base Fee",
                    "Disc or MU",
                    "AF-R",
                    "AF",
                    "Training Fee",
                    "Meals & Accom",
                ],
                ...rows.map((row) => [
                    row.account || "",
                    row.soa_no || "",
                    row.soa_date || "",
                    row.training || "",
                    row.training_date || "",
                    row.no_of_pax || "",
                    row.amount_billed || "",
                    row.amount_collected || "",
                    row.base_fee || "",
                    row.disc_or_mu || "",
                    row.af_r || "",
                    row.af || "",
                    row.training_fee || "",
                    row.meals_and_accom || "",
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
            const docData = await getFormDocument(user.uid, "Summary of Accounts", docId);
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
                                    Summary of Accounts
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

export default SummaryOfAccounts;
