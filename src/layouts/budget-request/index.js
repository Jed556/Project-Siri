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
import { useAuth } from "context/AuthContext";
import { getFormDocument } from "utils/firestoreService";

function BudgetRequest() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();

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
            formData: { rows },
        };
    }

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") return;
        try {
            const docData = await getFormDocument(user.uid, "Budget Request", docId);
            if (docData && docData.formData) {
                setRows(docData.formData.rows || [{}]);
            }
        } catch (err) {
            console.error("Failed to load document:", err);
        }
    };

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
