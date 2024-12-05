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

import { utils, writeFile } from "xlsx";
import PropTypes from "prop-types";

// Data
// Data sources goes here

function makeSheet(data) {
    const worksheet = utils.json_to_sheet(data.rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Apply column width
    const colWidths = data.rows.reduce((widths, row) => {
        Object.keys(row).forEach((key, index) => {
            const value = row[key] ? row[key].toString() : "";
            widths[index] = Math.max(widths[index] || 10, value.length);
        });
        return widths;
    }, []);
    worksheet["!cols"] = colWidths.map((width) => ({ wch: width }));

    // Apply row height and borders
    const range = utils.decode_range(worksheet["!ref"]);
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        worksheet[`!rows`] = worksheet[`!rows`] || [];
        worksheet[`!rows`][rowNum] = { hpx: 20 }; // Default row height

        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = utils.encode_cell({ r: rowNum, c: colNum });
            const cell = worksheet[cellAddress] || {};
            cell.s = cell.s || {};
            cell.s.border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" },
            };
            worksheet[cellAddress] = cell;
        }
    }

    return workbook;
}

function handleSubmit() {
    alert("Form submitted");
}

function handleDownload(data) {
    const workbook = makeSheet(data);
    writeFile(
        workbook,
        `${data.name}.xlsx` || `Siri_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
}

function handlePrint(data) {
    const workbook = makeSheet(data);
    const excelBuffer = writeFile(workbook, { bookType: "xlsx", type: "buffer" });
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data.name || "WeeklyItinerary.xlsx";
    a.click();
    URL.revokeObjectURL(url);
}

function SheetActionButtons({ sheetId, data }) {
    return (
        <MDBox py={3} px={2} textAlign="center">
            <MDButton variant="contained" color="success" onClick={handleSubmit}>
                Save to Google Sheets
            </MDButton>
            <MDButton
                variant="contained"
                color="info"
                onClick={() => handleDownload(data)}
                style={{ marginLeft: 10 }}
            >
                Download XLS
            </MDButton>
            <MDButton
                variant="contained"
                color="primary"
                onClick={() => handlePrint(data)}
                style={{ marginLeft: 10 }}
            >
                Print
            </MDButton>
        </MDBox>
    );
}

SheetActionButtons.defaultProps = {
    sheetId: "",
    data: { name: "", rows: [] },
};

SheetActionButtons.propTypes = {
    sheetId: PropTypes.string,
    data: PropTypes.shape({
        name: PropTypes.string,
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
};

export default SheetActionButtons;
