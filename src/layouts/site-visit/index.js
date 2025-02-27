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

function SiteVisitForm() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [clientRows, setClientRows] = useState([{}, {}]);
    const [actionRows, setActionRows] = useState([{}]);

    const addClientRow = () => {
        setClientRows([...clientRows, {}]);
    };

    const addActionRow = () => {
        setActionRows([...actionRows, {}]);
    };

    const saveToExcel = () => {
        // Implement save to Excel functionality
    };

    const saveToDatabase = () => {
        // Implement save to database functionality
    };

    const clientColumns = [
        { Header: "#", accessor: "index" },
        { Header: "Name", accessor: "name" },
        { Header: "Designation", accessor: "designation" },
    ];

    const clientData = clientRows.map((_, index) => ({
        index: index + 1,
        name: <MDInput fullWidth name={`name${index + 1}`} />,
        designation: <MDInput fullWidth name={`designation${index + 1}`} />,
    }));

    const actionColumns = [
        { Header: "Action Items", accessor: "action" },
        { Header: "Target Date", accessor: "targetDate" },
        { Header: "P/C", accessor: "pc" },
        { Header: "Status", accessor: "status" },
    ];

    const actionData = actionRows.map((_, index) => ({
        action: <MDInput fullWidth name={`action${index + 1}`} />,
        targetDate: <MDInput fullWidth type="date" name={`targetDate${index + 1}`} />,
        pc: <MDInput fullWidth name={`pc${index + 1}`} />,
        status: <MDInput fullWidth name={`status${index + 1}`} />,
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
                                    Site Visit Form
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} px={2}>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6">Date:</MDTypography>
                                    <MDInput fullWidth type="date" name="date" required />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6">
                                        School/Company/Organization:
                                    </MDTypography>
                                    <MDInput fullWidth name="organization" required />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6">Client Attendees</MDTypography>
                                    <DataTable
                                        table={{ columns: clientColumns, rows: clientData }}
                                        entriesPerPage={false}
                                        canSearch={false}
                                        showTotalEntries={false}
                                        isSorted={false}
                                        noEndBorder
                                    />
                                    <MDBox pt={3}>
                                        <MDButton
                                            variant="contained"
                                            color="secondary"
                                            onClick={addClientRow}
                                        >
                                            Add New Client Row
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                                <MDBox mb={2} pt={3}>
                                    <MDTypography variant="h6">Notes:</MDTypography>
                                    <MDInput fullWidth multiline rows={4} name="notes" />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDTypography variant="h6">Action Items</MDTypography>
                                    <DataTable
                                        table={{ columns: actionColumns, rows: actionData }}
                                        entriesPerPage={false}
                                        canSearch={false}
                                        showTotalEntries={false}
                                        isSorted={false}
                                        noEndBorder
                                    />
                                    <MDBox pt={3}>
                                        <MDButton
                                            variant="contained"
                                            color="secondary"
                                            onClick={addActionRow}
                                        >
                                            Add New Action Row
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                                <SheetActionButtons sheetId="" />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default SiteVisitForm;
