// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input"; // Import MUI Input component
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useMaterialUIController } from "context";

import { utils, writeFile } from "xlsx";
import PropTypes from "prop-types";
import MasterSheetDb from "utils/MasterSheetDb";
import SpreadsheetService from "utils/SpreadsheetService";

// Data
// Data sources goes here

const masterSheetDb = new MasterSheetDb();
const spreadsheetService = new SpreadsheetService();

const fetchSpreadsheets = async (setSpreadsheets, type, email, notTrashedOnly = false) => {
    const filters = [
        [3, email],
        [1, type],
    ];
    if (notTrashedOnly) {
        filters.push([5, "FALSE"]);
    }
    const filteredSpreadsheets = await masterSheetDb.getFilteredSpreadsheets(filters);
    setSpreadsheets(filteredSpreadsheets);
};

function getLongestRow(rows) {
    const longestRow = rows.reduce((maxRow, currentRow) => {
        return currentRow.length > maxRow.length ? currentRow : maxRow;
    }, []);
    return longestRow;
}

function makeWebSheet(data) {
    const worksheet = utils.aoa_to_sheet(data.rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, data.sheetName);

    // Apply column width
    const colWidths = data.rows.reduce((widths, row) => {
        row.forEach((value, index) => {
            const cellValue = value ? value.toString() : "";
            widths[index] = Math.max(widths[index] || 10, cellValue.length);
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

async function handleSubmit(data, selectedSpreadsheet, setSelectedSpreadsheet, author) {
    let spreadsheetId = selectedSpreadsheet;
    if (!spreadsheetId || spreadsheetId === "new") {
        const response = await spreadsheetService.createSpreadsheet({
            properties: { title: data.fileName },
            sheets: [
                {
                    properties: {
                        title: data.sheetName,
                        gridProperties: { rowCount: 1000, columnCount: 26 },
                        tabColor: { red: 1, green: 0.3, blue: 0.4 },
                    },
                },
            ],
        });
        spreadsheetId = response.spreadsheetId;

        await masterSheetDb.appendSpreadsheet(
            data.fileName,
            data.type,
            new Date().toISOString(),
            author,
            spreadsheetId
        );
    }
    await spreadsheetService.updateSpreadsheetValues(spreadsheetId, data.sheetName, data.rows);
    const longestRow = getLongestRow(data.rows);
    await spreadsheetService.autoResizeColumns(
        spreadsheetId,
        await spreadsheetService.getSheetId(spreadsheetId, data.sheetName),
        0,
        longestRow.length
    );
    setSelectedSpreadsheet(spreadsheetId);
}

function handleDownload(data) {
    const workbook = makeWebSheet(data);
    writeFile(
        workbook,
        `${data.fileName}.xlsx` || `Siri_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
}

function handlePrint(data, spreadsheetId) {
    spreadsheetService
        .getSpreadsheetValues(spreadsheetId, data.sheetName)
        .then((response) => {
            //console.log(response);
            const rows = response.values || [];
            data.rows = rows;

            const workbook = makeWebSheet(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const html = utils.sheet_to_html(worksheet);

            const printWindow = window.open("", "_blank");
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        })
        .catch((err) => console.error(err));
}

function handleDelete(spreadsheetId, fetchSpreadsheets) {
    masterSheetDb.markSpreadsheetAsTrashed(spreadsheetId);
}

function SheetActionButtons({ data, readonly, onSheetChange }) {
    // The useMaterialUIController hook is used to access the Material UI controller
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [selectedSpreadsheet, setSelectedSpreadsheet] = useState("new");
    const [spreadsheets, setSpreadsheets] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchSpreadsheets(setSpreadsheets, data.type, user[4], true); // Use email from user array
    }, []);

    const handleSpreadsheetChange = (event) => {
        const spreadsheetId = event.target.value;
        setSelectedSpreadsheet(spreadsheetId);
        if (onSheetChange) {
            onSheetChange(spreadsheetId, data.sheetName);
        }
    };

    const getSelectedSpreadsheetName = () => {
        if (selectedSpreadsheet === "new") {
            return "History"; // New Sheet
        }
        const spreadsheet = spreadsheets.find(
            (spreadsheet) => spreadsheet[4] === selectedSpreadsheet
        );
        return spreadsheet ? `${spreadsheet[0]}` : "";
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleAction = async (actions, sMessage, fMessage) => {
        try {
            if (Array.isArray(actions)) {
                for (const action of actions) {
                    await action();
                }
            } else {
                await actions();
            }
            showSnackbar(sMessage, "success");
        } catch (error) {
            showSnackbar(fMessage, "error");
        }
    };

    return (
        <MDBox py={3} px={2} textAlign="center">
            <Select
                value={selectedSpreadsheet}
                onChange={handleSpreadsheetChange}
                displayEmpty
                renderValue={getSelectedSpreadsheetName}
                input={<Input />}
                style={{
                    marginRight: readonly ? 0 : 10,
                    minWidth: 200,
                    height: 40,
                    backgroundColor: "#1a73e8",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "0 10px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textTransform: "none",
                }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: "#1a73e8",
                            color: "#fff",
                        },
                    },
                }}
            >
                <MenuItem value="new">New Sheet</MenuItem>
                {spreadsheets.map((spreadsheet) => (
                    <MenuItem key={spreadsheet[4]} value={spreadsheet[4]}>
                        {spreadsheet[0]}
                    </MenuItem>
                ))}
            </Select>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        [
                            () => fetchSpreadsheets(setSpreadsheets, data.type, user[4], true),
                            () => onSheetChange(selectedSpreadsheet, data.sheetName),
                        ],
                        "Spreadsheets refreshed",
                        "Failed to refresh spreadsheets"
                    )
                }
                style={{ marginLeft: 10 }}
            >
                Refresh Sheets
            </MDButton>
            {!readonly && (
                <MDButton
                    variant="contained"
                    color={sidenavColor}
                    onClick={() =>
                        handleAction(
                            [
                                () =>
                                    handleSubmit(
                                        data,
                                        selectedSpreadsheet,
                                        setSelectedSpreadsheet,
                                        user[4]
                                    ),
                                () => fetchSpreadsheets(setSpreadsheets, data.type, user[4], true),
                            ],
                            `Spreadsheet ${selectedSpreadsheet === "new" ? "created" : "updated"
                            } successfully`,
                            `Failed to ${selectedSpreadsheet === "new" ? "create" : "update"
                            } spreadsheet`
                        )
                    }
                    style={{ marginLeft: 10 }}
                >
                    {selectedSpreadsheet === "new" ? "Save Google Sheet" : "Save Google Sheet"}
                    {/* {selectedSpreadsheet === "new" ? "New Google Sheet" : "Save Google Sheet"} */}
                </MDButton>
            )}
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => handleDownload(data),
                        "Download successful",
                        "Failed to download"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSpreadsheet === "new"}
            >
                Download XLS
            </MDButton>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => handlePrint(data, selectedSpreadsheet),
                        "Printing...",
                        "Failed to print"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSpreadsheet === "new"}
            >
                Print
            </MDButton>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => spreadsheetService.openSpreadsheetInNewTab(selectedSpreadsheet),
                        "Redirecting...",
                        "Failed to redirect"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSpreadsheet === "new"}
            >
                Open Sheet
            </MDButton>
            <MDButton
                variant="contained"
                color="error"
                onClick={() =>
                    handleAction(
                        () => handleDelete(selectedSpreadsheet, setSpreadsheets),
                        "Spreadsheet deleted successfully",
                        "Failed to delete spreadsheet"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSpreadsheet === "new"}
            >
                Delete Sheet
            </MDButton>
            <MDSnackbar
                color={snackbar.severity}
                icon="notifications"
                title={snackbar.severity === "success" ? "Success" : "Error"}
                content={snackbar.message}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                close={handleSnackbarClose}
                bgWhite
            />
        </MDBox>
    );
}

SheetActionButtons.defaultProps = {
    data: {
        spreadsheetTitle: "Untitled Spreadsheet",
        sheetName: "Sheet1",
        fileName: "New Spreadsheet",
        type: "",
        sheetId: "",
        rows: [],
    },
    readonly: false,
    onSheetChange: null,
};

SheetActionButtons.propTypes = {
    data: PropTypes.shape({
        spreadsheetTitle: PropTypes.string,
        sheetName: PropTypes.string,
        fileName: PropTypes.string,
        type: PropTypes.string,
        sheetId: PropTypes.string,
        rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    }),
    readonly: PropTypes.bool, // Added propTypes validation for readonly
    onSheetChange: PropTypes.func, // Add propTypes validation for onSheetChange
};

export default SheetActionButtons;
