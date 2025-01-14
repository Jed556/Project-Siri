// React components
import React, { useState } from "react";

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

function SummaryOfArrangement() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    function formatTableData() {
        return {
            name: "Summary_of_Arrangement",
            rows: rows.map((row) => ({
                Account: row.account || "",
                AE: row.ae || "",
                "Main Contacts": row.mainContacts || "",
                Designation: row.designation || "",
                Courses: row.courses || "",
                "Old Rates": row.oldRates || "",
                "Fees Breakdown": row.feesBreakdown || "",
                Discount: row.discount || "",
                "AF-R": row.afR || "",
                "Official Rate": row.officialRate || "",
                "Last Update": row.lastUpdate || "",
                "Terms (Weeks)": row.terms || "",
                "Signed Docs - MOA": row.signedDocsMoa || "",
                "Signed Docs - SP": row.signedDocsSp || "",
                Remarks: row.remarks || "",
            })),
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
                            <SheetActionButtons data={formatTableData()} />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company="" />
        </DashboardLayout>
    );
}

export default SummaryOfArrangement;
