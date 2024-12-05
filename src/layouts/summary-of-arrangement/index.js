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

import React, { useState } from "react";

function SummaryOfArrangement() {
    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

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

    const data = rows.map((_, index) => ({
        account: <MDInput fullWidth placeholder="Account" />,
        ae: <MDInput fullWidth placeholder="AE" />,
        mainContacts: <MDInput fullWidth placeholder="Main Contacts" />,
        designation: <MDInput fullWidth placeholder="Designation" />,
        courses: <MDInput fullWidth placeholder="Courses" />,
        oldRates: <MDInput fullWidth placeholder="Old Rates" />,
        feesBreakdown: <MDInput fullWidth placeholder="Fees Breakdown" />,
        discount: <MDInput fullWidth placeholder="Discount" />,
        afR: <MDInput fullWidth placeholder="AF-R" />,
        officialRate: <MDInput fullWidth placeholder="Official Rate" />,
        lastUpdate: <MDInput fullWidth type="date" />,
        terms: <MDInput fullWidth placeholder="Terms (Weeks)" />,
        signedDocsMoa: <MDInput fullWidth placeholder="Signed Docs - MOA" />,
        signedDocsSp: <MDInput fullWidth placeholder="Signed Docs - SP" />,
        remarks: <MDInput fullWidth placeholder="Remarks" />,
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
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Summary of Arrangements
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} px={2}>
                                <DataTable
                                    table={{ columns, rows: data }}
                                    entriesPerPage={false}
                                    canSearch={false}
                                    showTotalEntries={false}
                                    isSorted={false}
                                    noEndBorder
                                />
                                <MDBox pt={3} px={2} textAlign="left">
                                    <MDButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={addNewRow}
                                    >
                                        Add New Row
                                    </MDButton>
                                </MDBox>
                                <SheetActionButtons sheetId="" />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default SummaryOfArrangement;
