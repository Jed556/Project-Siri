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

function SheetActionButtons() {
    return (
        <MDBox py={3} px={2} textAlign="center">
            <MDButton variant="contained" color="success" onClick={handleSubmit}>
                Save to Google Sheets
            </MDButton>
            <MDButton
                variant="contained"
                color="info"
                onClick={() => alert("Edit clicked")}
                style={{ marginLeft: 10 }}
            >
                Download XLS
            </MDButton>
            <MDButton
                variant="contained"
                color="primary"
                onClick={() => window.print()}
                style={{ marginLeft: 10 }}
            >
                Print
            </MDButton>
        </MDBox>
    );
}

export default SheetActionButtons;
