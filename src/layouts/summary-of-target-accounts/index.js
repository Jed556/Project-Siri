// React components
import React, { useState, useEffect } from "react";

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

function SummaryOfTargetAccounts() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "AE", accessor: "ae", placeholder: "AE", type: "text" },
        { Header: "Address", accessor: "address", placeholder: "Address", type: "text" },
        { Header: "Region", accessor: "region", placeholder: "Region", type: "text" },
        {
            Header: "Name of Account",
            accessor: "name_of_account",
            placeholder: "Name of Account",
            type: "text",
        },
        { Header: "Type", accessor: "type", placeholder: "Type", type: "text" },
        { Header: "Status", accessor: "status", placeholder: "Status", type: "text" },
        {
            Header: "Program Offering",
            accessor: "program_offering",
            placeholder: "Program Offering",
            type: "text",
        },
        {
            Header: "Contact Person",
            accessor: "contact_person",
            placeholder: "Contact Person",
            type: "text",
        },
        {
            Header: "Designation",
            accessor: "designation",
            placeholder: "Designation",
            type: "text",
        },
        {
            Header: "Contact Number",
            accessor: "contact_number",
            placeholder: "Contact Number",
            type: "text",
        },
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
            spreadsheetTitle: "Summary_of_Target_Accounts",
            sheetName: "Summary_of_Target_Accounts",
            fileName: `Summary_of_Target_Accounts_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}`,
            type: "Summary of Target Accounts",
            rows: [
                ["SUMMARY OF TARGET ACCOUNTS"],
                [""],
                [
                    "AE",
                    "Address",
                    "Region",
                    "Name of Account",
                    "Type",
                    "Status",
                    "Program Offering",
                    "Contact Person",
                    "Designation",
                    "Contact Number",
                ],
                ...rows.map((row) => [
                    row.ae || "",
                    row.address || "",
                    row.region || "",
                    row.name_of_account || "",
                    row.type || "",
                    row.status || "",
                    row.program_offering || "",
                    row.contact_person || "",
                    row.designation || "",
                    row.contact_number || "",
                ]),
            ],
            formData: { rows },
        };
    }

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") return;
        try {
            const docData = await getFormDocument(user.uid, "Summary of Target Accounts", docId);
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
                                    Summary of Target Accounts
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

export default SummaryOfTargetAccounts;
