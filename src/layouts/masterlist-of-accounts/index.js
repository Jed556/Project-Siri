// @mui material components
import React, { useState } from "react";
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

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function MasterlistOfAccounts() {
    const [rows, setRows] = useState([{}]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "ACCOUNT", accessor: "account" },
        { Header: "CONTACT PERSON", accessor: "contactPerson" },
        { Header: "POSITION", accessor: "position" },
        { Header: "ADDRESS (Street City, Province)", accessor: "address" },
        { Header: "CONTACT NO.", accessor: "contactNo" },
        { Header: "E-MAIL", accessor: "email" },
    ];

    const data = rows.map((_, index) => ({
        account: <MDInput fullWidth placeholder="Account Name" />,
        contactPerson: <MDInput fullWidth placeholder="Contact Person" />,
        position: <MDInput fullWidth placeholder="Position" />,
        address: <MDInput fullWidth placeholder="Address" />,
        contactNo: <MDInput fullWidth placeholder="Contact No." />,
        email: <MDInput fullWidth type="email" placeholder="E-mail" />,
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
                                    Masterlist of Accounts
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

export default MasterlistOfAccounts;
