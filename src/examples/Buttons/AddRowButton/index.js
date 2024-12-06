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

import PropTypes from "prop-types";

function AddRowButton({ rows }) {
    const handleAddRow = () => {
        rows.push({});
    };

    return (
        <MDButton onClick={handleAddRow} variant="contained" color="primary">
            Add New Row
        </MDButton>
    );
}

AddRowButton.defaultProps = {
    rows: [],
};

AddRowButton.propTypes = {
    rows: PropTypes.array,
};

export default AddRowButton;
