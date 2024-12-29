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

import { utils, writeFile, write } from "xlsx"; // Added write to the import statement
import PropTypes from "prop-types";
import { da } from "date-fns/locale";
import MasterSheetDb from "utils/MasterSheetDb";
import SpreadsheetService from "utils/SpreadsheetService";

// Data
// Data sources goes here

const masterSheetDb = new MasterSheetDb();
const spreadsheetService = new SpreadsheetService();

const fetchSheets = async (setSheets, type, author) => {
    const filters = [
        [3, author], // Assuming index 3 is the author
        [1, type], // Assuming index 1 is the type
    ];
    const filteredSheets = await masterSheetDb.getFilteredSheets(filters);
    setSheets(filteredSheets);
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
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

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

async function handleSubmit(data, author, selectedSheet, setSheets, setSelectedSheet) {
    let spreadsheetId = selectedSheet;
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

        await masterSheetDb.loadSheets();
        await masterSheetDb.appendSheetData(
            data.fileName,
            data.type,
            new Date().toISOString(),
            "creator",
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
    setSelectedSheet(spreadsheetId);
    localStorage.setItem("currentSheetId", spreadsheetId);
    fetchSheets(setSheets, data.type, author); // Refresh the sheets after submission
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
            console.log(response);
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

function SheetActionButtons({ data, readonly }) {
    // The useMaterialUIController hook is used to access the Material UI controller
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [selectedSheet, setSelectedSheet] = useState("new");
    const [sheets, setSheets] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        fetchSheets(setSheets, data.type, "creator");
    }, []);

    const handleSheetChange = (event) => {
        const sheetId = event.target.value;
        setSelectedSheet(sheetId);
        localStorage.setItem("currentSheetId", sheetId);
        console.log("Selected sheet:", sheetId);
    };

    const getSelectedSheetName = () => {
        if (selectedSheet === "new") {
            return "New Sheet";
        }
        const sheet = sheets.find((sheet) => sheet[4] === selectedSheet);
        return sheet ? `${sheet[0]}` : "";
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleAction = async (action, sMessage, fMessage) => {
        try {
            await action();
            showSnackbar(sMessage, "success");
        } catch (error) {
            showSnackbar(fMessage, "error");
        }
    };

    return (
        <MDBox py={3} px={2} textAlign="center">
            <Select
                value={selectedSheet}
                onChange={handleSheetChange}
                displayEmpty
                renderValue={getSelectedSheetName}
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
                {sheets.map((sheet) => (
                    <MenuItem key={sheet[4]} value={sheet[4]}>
                        {sheet[0]}
                    </MenuItem>
                ))}
            </Select>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => fetchSheets(setSheets, data.type, "creator"),
                        "Sheets refreshed",
                        "Failed to refresh sheets"
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
                            () =>
                                handleSubmit(
                                    data,
                                    "creator",
                                    selectedSheet,
                                    setSheets,
                                    setSelectedSheet
                                ),
                            `Sheet ${selectedSheet === "new" ? "created" : "updated"} successfully`,
                            `Failed to ${selectedSheet === "new" ? "create" : "update"} sheet`
                        )
                    }
                    style={{ marginLeft: 10 }}
                >
                    {selectedSheet === "new" ? "New Google Sheet" : "Save Google Sheet"}
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
                disabled={selectedSheet === "new"}
            >
                Download XLS
            </MDButton>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => handlePrint(data, selectedSheet),
                        "Printing...",
                        "Failed to print"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSheet === "new"}
            >
                Print
            </MDButton>
            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(
                        () => spreadsheetService.openSpreadsheetInNewTab(selectedSheet),
                        "Redirecting...",
                        "Failed to redirect"
                    )
                }
                style={{ marginLeft: 10 }}
                disabled={selectedSheet === "new"}
            >
                Open Sheet
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
        wbTitle: "Untitled Workbook",
        sheetName: "Sheet1",
        fileName: "New Spreadsheet",
        type: "",
        sheetId: "",
        rows: [],
    },
};

SheetActionButtons.propTypes = {
    data: PropTypes.shape({
        wbTitle: PropTypes.string,
        sheetName: PropTypes.string,
        fileName: PropTypes.string,
        type: PropTypes.string,
        sheetId: PropTypes.string,
        rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    }),
    readonly: PropTypes.bool, // Added propTypes validation for readonly
};

export default SheetActionButtons;
