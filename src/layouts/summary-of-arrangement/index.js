// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";

// Configs
import configs from "config";
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function SummaryOfArrangement() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

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
            <MDInput
                fullWidth
                type="date"
                value={row.lastUpdate || ""}
                onChange={(e) => handleInputChange(index, "lastUpdate", e.target.value)}
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

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                const updatedRows = values.slice(3).map((row) => ({
                    account: row[0] || "",
                    ae: row[1] || "",
                    mainContacts: row[2] || "",
                    designation: row[3] || "",
                    courses: row[4] || "",
                    oldRates: row[5] || "",
                    feesBreakdown: row[6] || "",
                    discount: row[7] || "",
                    afR: row[8] || "",
                    officialRate: row[9] || "",
                    lastUpdate: row[10] || "",
                    terms: row[11] || "",
                    signedDocsMoa: row[12] || "",
                    signedDocsSp: row[13] || "",
                    remarks: row[14] || "",
                }));

                setRows(updatedRows);
            });
        }
    };

    useEffect(() => {
        handleSheetChange();
    }, []);

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
                                <DataTable
                                    table={{ columns, rows: data }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
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
