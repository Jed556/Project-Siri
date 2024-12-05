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

// Data
// Data sources goes here

function ClientEntertainmentRequest() {
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
                                    Client Entertainment Request Form
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} px={3}>
                                <MDBox mb={3}>
                                    <MDTypography variant="h6">Remarks on Account:</MDTypography>
                                    <MDInput fullWidth multiline rows={3} />
                                </MDBox>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            type="text"
                                            label="Target Date"
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="ENT Location" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="School/Organization" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Client/s" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Designation" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Reason / Remarks" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Target ENT. Item/s" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput type="number" label="Estimated Amount" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Requested By / Date" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Noted (Finance/Operations)" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput label="Approved (President)" fullWidth />
                                    </Grid>
                                </Grid>
                            </MDBox>
                            <SheetActionButtons sheetId="" />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default ClientEntertainmentRequest;
