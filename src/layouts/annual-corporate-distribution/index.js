// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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

function AnnualCorporateDistributionList() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const { user } = useAuth();

    const [rows, setRows] = useState([{}]);
    const [data, setData] = useState([]);
    const [formDetails, setFormDetails] = useState({
        totalInitialRequest: "",
        contingency: "",
        overallTotal: "",
    });

    const addNewRow = () => {
        setRows([...rows, {}]);
    };

    const columns = [
        { Header: "No.", accessor: "no", placeholder: "No.", type: "text" },
        { Header: "Company", accessor: "company", placeholder: "Company", type: "text" },
        {
            Header: "Recipient / Name",
            accessor: "recipient",
            placeholder: "Recipient / Name",
            type: "text",
        },
        {
            Header: "Designation",
            accessor: "designation",
            placeholder: "Designation",
            type: "text",
        },
        {
            Header: "Category 1 (Type A)",
            accessor: "category1TypeA",
            placeholder: "Category 1 (Type A)",
            type: "text",
        },
        {
            Header: "Category 1 (Type B)",
            accessor: "category1TypeB",
            placeholder: "Category 1 (Type B)",
            type: "text",
        },
        {
            Header: "Category 1 (Type C)",
            accessor: "category1TypeC",
            placeholder: "Category 1 (Type C)",
            type: "text",
        },
        {
            Header: "Category 2 (Type A)",
            accessor: "category2TypeA",
            placeholder: "Category 2 (Type A)",
            type: "text",
        },
        {
            Header: "Category 2 (Type B)",
            accessor: "category2TypeB",
            placeholder: "Category 2 (Type B)",
            type: "text",
        },
        {
            Header: "Category 2 (Type C)",
            accessor: "category2TypeC",
            placeholder: "Category 2 (Type C)",
            type: "text",
        },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        setRows(updatedRows);
    };

    const handleFormDetailsChange = (field, value) => {
        setFormDetails((prevState) => ({
            ...prevState,
            [field]: value,
        }));
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
            spreadsheetTitle: "Annual_Corporate_Distribution_List",
            sheetName: "Annual_Corporate_Distribution_List",
            fileName: `Annual_Corporate_Distribution_List_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}`,
            type: "Annual Corporate Distribution List",
            rows: [
                ["ANNUAL CORPORATE DISTRIBUTION LIST"],
                [""],
                [
                    "No.",
                    "Company",
                    "Recipient / Name",
                    "Designation",
                    "Category 1 (Type A)",
                    "Category 1 (Type B)",
                    "Category 1 (Type C)",
                    "Category 2 (Type A)",
                    "Category 2 (Type B)",
                    "Category 2 (Type C)",
                ],
                ...rows.map((row) => [
                    row.no || "",
                    row.company || "",
                    row.recipient || "",
                    row.designation || "",
                    row.category1TypeA || "",
                    row.category1TypeB || "",
                    row.category1TypeC || "",
                    row.category2TypeA || "",
                    row.category2TypeB || "",
                    row.category2TypeC || "",
                ]),
                ["Total Initial Request (AE Name)", formDetails.totalInitialRequest],
                ["Add: Contingency", formDetails.contingency],
                ["Overall Total", formDetails.overallTotal],
            ],
            formData: { rows, formDetails },
        };
    }

    const handleSheetChange = async (docId) => {
        if (!docId || docId === "new") return;
        try {
            const docData = await getFormDocument(
                user.uid,
                "Annual Corporate Distribution List",
                docId
            );
            if (docData && docData.formData) {
                setRows(docData.formData.rows || [{}]);
                setFormDetails(
                    docData.formData.formDetails || {
                        totalInitialRequest: "",
                        contingency: "",
                        overallTotal: "",
                    }
                );
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
                                    Annual Corporate Distribution List
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
                            <MDBox
                                pt={3}
                                px={2}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MDButton variant="contained" color="secondary" onClick={addNewRow}>
                                    Add New Row
                                </MDButton>
                            </MDBox>
                            <MDBox pt={5} px={2}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Total Initial Request (AE Name)"
                                            value={formDetails.totalInitialRequest}
                                            onChange={(e) =>
                                                handleFormDetailsChange(
                                                    "totalInitialRequest",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Add: Contingency"
                                            value={formDetails.contingency}
                                            onChange={(e) =>
                                                handleFormDetailsChange(
                                                    "contingency",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            label="Overall Total"
                                            value={formDetails.overallTotal}
                                            onChange={(e) =>
                                                handleFormDetailsChange(
                                                    "overallTotal",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                </Grid>
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

export default AnnualCorporateDistributionList;
