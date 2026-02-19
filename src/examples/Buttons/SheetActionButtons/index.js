// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import { useState, useEffect, useCallback } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useMaterialUIController } from "context";

import { utils, writeFile } from "xlsx";
import PropTypes from "prop-types";
import { useAuth } from "context/AuthContext";
import { saveFormDocument, listFormDocuments, trashFormDocument } from "utils/firestoreService";

// ─── XLS helpers ────────────────────────────────────────────────────────────

function makeWebSheet(data) {
    const worksheet = utils.aoa_to_sheet(data.rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, data.sheetName);

    const colWidths = data.rows.reduce((widths, row) => {
        row.forEach((value, index) => {
            const cellValue = value ? value.toString() : "";
            widths[index] = Math.max(widths[index] || 10, cellValue.length);
        });
        return widths;
    }, []);
    worksheet["!cols"] = colWidths.map((width) => ({ wch: width }));

    const range = utils.decode_range(worksheet["!ref"]);
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        worksheet["!rows"] = worksheet["!rows"] || [];
        worksheet["!rows"][rowNum] = { hpx: 20 };
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

function handleDownload(data) {
    const workbook = makeWebSheet(data);
    writeFile(
        workbook,
        `${data.fileName}.xlsx` || `Siri_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
}

function handlePrint(data) {
    const workbook = makeWebSheet(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const html = utils.sheet_to_html(worksheet);

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// ─── Component ──────────────────────────────────────────────────────────────

function SheetActionButtons({ data, readonly, onSheetChange }) {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();

    const [selectedDoc, setSelectedDoc] = useState("new");
    const [documents, setDocuments] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    // ── Fetch saved documents from Firestore ─────────────────────────────
    const refreshDocuments = useCallback(async () => {
        if (!user) return;
        try {
            const docs = await listFormDocuments(user.uid, data.type);
            setDocuments(docs);
        } catch (err) {
            console.error("Failed to list documents:", err);
        }
    }, [user, data.type]);

    useEffect(() => {
        refreshDocuments();
    }, [refreshDocuments]);

    // ── Handlers ─────────────────────────────────────────────────────────

    const handleDocChange = async (event) => {
        const docId = event.target.value;
        setSelectedDoc(docId);
        if (docId !== "new" && onSheetChange) {
            onSheetChange(docId);
        }
    };

    const getSelectedName = () => {
        if (selectedDoc === "new") return "History";
        const found = documents.find((d) => d.id === selectedDoc);
        return found ? found.name : "";
    };

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
    const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });

    const handleAction = async (actions, sMessage, fMessage) => {
        try {
            if (Array.isArray(actions)) {
                for (const action of actions) await action();
            } else {
                await actions();
            }
            showSnackbar(sMessage, "success");
        } catch (error) {
            console.error(error);
            showSnackbar(fMessage, "error");
        }
    };

    // ── Save to Firestore ────────────────────────────────────────────────
    const handleSave = async () => {
        const docId = selectedDoc === "new" ? null : selectedDoc;
        const payload = {
            name: data.fileName,
            formData: data.formData || {},
            rows: data.rows,
        };
        const result = await saveFormDocument(user.uid, data.type, payload, docId);
        setSelectedDoc(result.id);
        await refreshDocuments();
    };

    // ── Delete (trash) ───────────────────────────────────────────────────
    const handleDelete = async () => {
        if (selectedDoc === "new") return;
        await trashFormDocument(user.uid, data.type, selectedDoc);
        setSelectedDoc("new");
        await refreshDocuments();
    };

    return (
        <MDBox py={3} px={2} textAlign="center">
            <Select
                value={selectedDoc}
                onChange={handleDocChange}
                displayEmpty
                renderValue={getSelectedName}
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
                        style: { backgroundColor: "#1a73e8", color: "#fff" },
                    },
                }}
            >
                <MenuItem value="new">New Document</MenuItem>
                {documents.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                        {d.name}
                    </MenuItem>
                ))}
            </Select>

            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(refreshDocuments, "Documents refreshed", "Failed to refresh")
                }
                style={{ marginLeft: 10 }}
            >
                Refresh
            </MDButton>

            {!readonly && (
                <MDButton
                    variant="contained"
                    color={sidenavColor}
                    onClick={() =>
                        handleAction(
                            handleSave,
                            selectedDoc === "new"
                                ? "Document created successfully"
                                : "Document updated successfully",
                            "Failed to save document"
                        )
                    }
                    style={{ marginLeft: 10 }}
                >
                    Save
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
            >
                Download XLS
            </MDButton>

            <MDButton
                variant="contained"
                color={sidenavColor}
                onClick={() =>
                    handleAction(() => handlePrint(data), "Printing...", "Failed to print")
                }
                style={{ marginLeft: 10 }}
            >
                Print
            </MDButton>

            <MDButton
                variant="contained"
                color="error"
                onClick={() => handleAction(handleDelete, "Document deleted", "Failed to delete")}
                style={{ marginLeft: 10 }}
                disabled={selectedDoc === "new"}
            >
                Delete
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
        sheetName: "Sheet1",
        fileName: "New Document",
        type: "",
        rows: [],
        formData: {},
    },
    readonly: false,
    onSheetChange: null,
};

SheetActionButtons.propTypes = {
    data: PropTypes.shape({
        sheetName: PropTypes.string,
        fileName: PropTypes.string,
        type: PropTypes.string,
        rows: PropTypes.arrayOf(PropTypes.array).isRequired,
        formData: PropTypes.object,
    }),
    readonly: PropTypes.bool,
    onSheetChange: PropTypes.func,
};

export default SheetActionButtons;
