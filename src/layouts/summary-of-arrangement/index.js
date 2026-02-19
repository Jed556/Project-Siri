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

function SummaryOfArrangement() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();
    const theme = useTheme();

    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    function formatTableData() {
        return {
            spreadsheetTitle: "Summary_of_Arrangement",
            sheetName: "Summary_of_Arrangement",
            fileName: `Summary_of_Arrangement_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Summary of Arrangement",
            rows: [
                ["SUMMARY OF ARRANGEMENTS"],
                [""],
                [
                    "Account",
                    "AE",
                    "Main Contacts",
                    "Designation",
                    "Courses",
                    "Old Rates",
                    "Fees Breakdown",
                    "Discount",
                    "AF-R",
                    "Official Rate",
                    "Last Update",
                    "Terms (Weeks)",
                    "Signed Docs - MOA",
                    "Signed Docs - SP",
                    "Remarks",
                ],
                ...rows.map((row) => [
                    row.account || "",
                    row.ae || "",
                    row.mainContacts || "",
                    row.designation || "",
                    row.courses || "",
                    row.oldRates || "",
                    row.feesBreakdown || "",
                    row.discount || "",
                    row.afR || "",
                    row.officialRate || "",
                    row.lastUpdate || "",
                    row.terms || "",
                    row.signedDocsMoa || "",
                    row.signedDocsSp || "",
                    row.remarks || "",
                ]),
            ],
            formData: { rows },
        };
    }

    const columns = [
        { Header: "ACCOUNT", accessor: "account" },
        { Header: "AE", accessor: "ae" },
        { Header: "MAIN CONTACT/S FOR ARRANGEMENTS", accessor: "mainContacts" },
        { Header: "DESIGNATION", accessor: "designation" },
        { Header: "COURSE/S", accessor: "courses" },
        { Header: "OLD RATES", accessor: "oldRates" },
        { Header: "FEES' BREAKDOWN - BASE", accessor: "feesBreakdown" },
        { Header: "DISCOUNT", accessor: "discount" },
        { Header: "AF-R", accessor: "afR" },
        { Header: "OFFICIAL RATE", accessor: "officialRate" },
        { Header: "LAST UPDATE", accessor: "lastUpdate" },
        { Header: "TERMS (WEEKS)", accessor: "terms" },
        { Header: "SIGNED DOCS - MOA", accessor: "signedDocsMoa" },
        { Header: "SIGNED DOCS - SP", accessor: "signedDocsSp" },
        { Header: "REMARKS", accessor: "remarks" },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
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

    const data = rows.map((row, index) => ({
        account: (
            <MDInput
                fullWidth
                placeholder="Account"
                value={row.account || ""}
                onChange={(e) => handleInputChange(index, "account", e.target.value)}
            />
        ),
        ae: (
            <MDInput
                fullWidth
                placeholder="AE"
                value={row.ae || ""}
                onChange={(e) => handleInputChange(index, "ae", e.target.value)}
            />
        ),
        mainContacts: (
            <MDInput
                fullWidth
                placeholder="Main Contacts"
                value={row.mainContacts || ""}
                onChange={(e) => handleInputChange(index, "mainContacts", e.target.value)}
            />
        ),
        designation: (
            <MDInput
                fullWidth
                placeholder="Designation"
                value={row.designation || ""}
                onChange={(e) => handleInputChange(index, "designation", e.target.value)}
            />
        ),
        courses: (
            <MDInput
                fullWidth
                placeholder="Courses"
                value={row.courses || ""}
                onChange={(e) => handleInputChange(index, "courses", e.target.value)}
            />
        ),
        oldRates: (
            <MDInput
                fullWidth
                placeholder="Old Rates"
                value={row.oldRates || ""}
                onChange={(e) => handleInputChange(index, "oldRates", e.target.value)}
            />
        ),
        feesBreakdown: (
            <MDInput
                fullWidth
                placeholder="Fees Breakdown"
                value={row.feesBreakdown || ""}
                onChange={(e) => handleInputChange(index, "feesBreakdown", e.target.value)}
            />
        ),
        discount: (
            <MDInput
                fullWidth
                placeholder="Discount"
                value={row.discount || ""}
                onChange={(e) => handleInputChange(index, "discount", e.target.value)}
            />
        ),
        afR: (
            <MDInput
                fullWidth
                placeholder="AF-R"
                value={row.afR || ""}
                onChange={(e) => handleInputChange(index, "afR", e.target.value)}
            />
        ),
        officialRate: (
            <MDInput
                fullWidth
                placeholder="Official Rate"
                value={row.officialRate || ""}
                onChange={(e) => handleInputChange(index, "officialRate", e.target.value)}
            />
        ),
        lastUpdate: (
            <DatePicker
                value={parseDateValue(row.lastUpdate)}
                onChange={(date) => handleInputChange(index, "lastUpdate", formatDateValue(date))}
                format="MM/dd/yyyy"
                slotProps={datePickerSlotProps}
            />
        ),
        terms: (
            <MDInput
                fullWidth
                placeholder="Terms (Weeks)"
                value={row.terms || ""}
                onChange={(e) => handleInputChange(index, "terms", e.target.value)}
            />
        ),
        signedDocsMoa: (
            <MDInput
                fullWidth
                placeholder="Signed Docs - MOA"
                value={row.signedDocsMoa || ""}
                onChange={(e) => handleInputChange(index, "signedDocsMoa", e.target.value)}
            />
        ),
        signedDocsSp: (
            <MDInput
                fullWidth
                placeholder="Signed Docs - SP"
                value={row.signedDocsSp || ""}
                onChange={(e) => handleInputChange(index, "signedDocsSp", e.target.value)}
            />
        ),
        remarks: (
            <MDInput
                fullWidth
                placeholder="Remarks"
                value={row.remarks || ""}
                onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
            />
        ),
    }));

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") {
            setRows([{}]);
            return;
        }
        try {
            const docData = await getFormDocument(user.uid, "Summary of Arrangement", docId);
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
                                    Summary of Arrangements
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

export default SummaryOfArrangement;
