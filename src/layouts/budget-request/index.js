// React components
import { useState, useEffect } from "react";

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
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function BudgetRequest() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "Category", accessor: "category", placeholder: "Category", type: "text" },
        { Header: "Mon", accessor: "mon", placeholder: "Mon", type: "text" },
        { Header: "Tue", accessor: "tue", placeholder: "Tue", type: "text" },
        { Header: "Wed", accessor: "wed", placeholder: "Wed", type: "text" },
        { Header: "Thu", accessor: "thu", placeholder: "Thu", type: "text" },
        { Header: "Fri", accessor: "fri", placeholder: "Fri", type: "text" },
        { Header: "Sat", accessor: "sat", placeholder: "Sat", type: "text" },
        { Header: "Sun", accessor: "sun", placeholder: "Sun", type: "text" },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    const createRowInputs = (rows, columns) => {
        const newData = rows.map((row, index) => {
            const rowData = {};
            columns.forEach((column) => {
                rowData[column.accessor] = (
                    <MDInput
                        fullWidth
                        type={column.type}
                        placeholder={column.placeholder}
                        value={row[column.accessor] || ""}
                        onChange={(e) => handleInputChange(index, column.accessor, e.target.value)}
                    />
                );
            });
            return rowData;
        });
        setData(newData);
    };

    useEffect(() => {
        createRowInputs(rows, columns);
    }, [rows]);

    function formatTableData() {
        return {
            spreadsheetTitle: "Budget_Request",
            sheetName: "Budget_Request",
            fileName: `Budget_Request_${new Date().toISOString().replace(/[:.]/g, "-")}`,
            type: "Budget Request",
            rows: [
                ["BUDGET REQUEST FORM"],
                [""],
                ["Category", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                ...rows.map((row) => [
                    row.category || "",
                    row.mon || "",
                    row.tue || "",
                    row.wed || "",
                    row.thu || "",
                    row.fri || "",
                    row.sat || "",
                    row.sun || "",
                ]),
            ],
        };
    }

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                const updatedRows = values.slice(3).map((row) => ({
                    category: row[0] || "",
                    mon: row[1] || "",
                    tue: row[2] || "",
                    wed: row[3] || "",
                    thu: row[4] || "",
                    fri: row[5] || "",
                    sat: row[6] || "",
                    sun: row[7] || "",
                }));

                setRows(updatedRows);
            });
        }
    };

    useEffect(() => {
        handleSheetChange();
    }, []);

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
                                    Budget Request Form
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2}>
                                <DataTable
                                    table={{ columns, rows: data }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                            <MDBox pt={3} px={2} textAlign="left">
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                            </MDBox>
                            <SheetActionButtons
                                data={formatTableData()}
                                onSheetChange={handleSheetChange}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer company={configs.footer.company} />
        </DashboardLayout>
    );
}

export default BudgetRequest;
