// React components
import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SheetActionButtons from "examples/Buttons/SheetActionButtons";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Configs
import configs from "config";
import SpreadsheetService from "utils/SpreadsheetService"; // Import SpreadsheetService

const spreadsheetService = new SpreadsheetService(); // Initialize SpreadsheetService

function ClientEntertainmentRequest() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [formData, setFormData] = useState({
        remarks: "",
        targetDate: "",
        entLocation: "",
        schoolOrganization: "",
        clients: "",
        designation: "",
        reasonRemarks: "",
        targetEntItems: "",
        estimatedAmount: "",
        requestedByDate: "",
        noted: "",
        approved: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    function formatTableData() {
        return {
            spreadsheetTitle: "Client_Entertainment_Request",
            sheetName: "Client_Entertainment_Request",
            fileName: `Client_Entertainment_Request_${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}`,
            type: "Client Entertainment Request",
            rows: [
                ["CLIENT ENTERTAINMENT REQUEST FORM"],
                ["Remarks on Account", formData.remarks],
                ["Target Date", formData.targetDate, "ENT Location", formData.entLocation],
                ["School/Organization", formData.schoolOrganization, "Client/s", formData.clients],
                ["Designation", formData.designation, "Reason / Remarks", formData.reasonRemarks],
                [
                    "Target ENT. Item/s",
                    formData.targetEntItems,
                    "Estimated Amount",
                    formData.estimatedAmount,
                ],
                [
                    "Requested By / Date",
                    formData.requestedByDate,
                    "Noted (Finance/Operations)",
                    formData.noted,
                ],
                [""],
                ["Approved (President)", formData.approved],
            ],
        };
    }

    const handleSheetChange = (spreadsheetId, sheetName) => {
        if (spreadsheetId) {
            // Load the sheet data using the currentSpreadsheetId
            spreadsheetService.getSpreadsheetValues(spreadsheetId, sheetName).then((response) => {
                const values = response.values || [];
                setFormData({
                    remarks: values[1] && values[1][1] ? values[1][1] : "",
                    targetDate: values[2] && values[2][1] ? values[2][1] : "",
                    entLocation: values[2] && values[2][3] ? values[2][3] : "",
                    schoolOrganization: values[3] && values[3][1] ? values[3][1] : "",
                    clients: values[3] && values[3][3] ? values[3][3] : "",
                    designation: values[4] && values[4][1] ? values[4][1] : "",
                    reasonRemarks: values[4] && values[4][3] ? values[4][3] : "",
                    targetEntItems: values[5] && values[5][1] ? values[5][1] : "",
                    estimatedAmount: values[5] && values[5][3] ? values[5][3] : "",
                    requestedByDate: values[6] && values[6][1] ? values[6][1] : "",
                    noted: values[6] && values[6][3] ? values[6][3] : "",
                    approved: values[8] && values[8][1] ? values[8][1] : "",
                });
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
                                    Client Entertainment Request Form
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3} px={3}>
                                <MDBox mb={3}>
                                    <MDTypography variant="h6">Remarks on Account:</MDTypography>
                                    <MDInput
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={formData.remarks}
                                        onChange={(e) =>
                                            handleInputChange("remarks", e.target.value)
                                        }
                                    />
                                </MDBox>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            fullWidth
                                            type="text"
                                            label="Target Date"
                                            value={formData.targetDate}
                                            onChange={(e) =>
                                                handleInputChange("targetDate", e.target.value)
                                            }
                                            onFocus={(e) => (e.target.type = "date")}
                                            onBlur={(e) => (e.target.type = "text")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="ENT Location"
                                            fullWidth
                                            value={formData.entLocation}
                                            onChange={(e) =>
                                                handleInputChange("entLocation", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="School/Organization"
                                            fullWidth
                                            value={formData.schoolOrganization}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "schoolOrganization",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Client/s"
                                            fullWidth
                                            value={formData.clients}
                                            onChange={(e) =>
                                                handleInputChange("clients", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Designation"
                                            fullWidth
                                            value={formData.designation}
                                            onChange={(e) =>
                                                handleInputChange("designation", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Reason / Remarks"
                                            fullWidth
                                            value={formData.reasonRemarks}
                                            onChange={(e) =>
                                                handleInputChange("reasonRemarks", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Target ENT. Item/s"
                                            fullWidth
                                            value={formData.targetEntItems}
                                            onChange={(e) =>
                                                handleInputChange("targetEntItems", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            type="number"
                                            label="Estimated Amount"
                                            fullWidth
                                            value={formData.estimatedAmount}
                                            onChange={(e) =>
                                                handleInputChange("estimatedAmount", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Requested By / Date"
                                            fullWidth
                                            value={formData.requestedByDate}
                                            onChange={(e) =>
                                                handleInputChange("requestedByDate", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Noted (Finance/Operations)"
                                            fullWidth
                                            value={formData.noted}
                                            onChange={(e) =>
                                                handleInputChange("noted", e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <MDInput
                                            label="Approved (President)"
                                            fullWidth
                                            value={formData.approved}
                                            onChange={(e) =>
                                                handleInputChange("approved", e.target.value)
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

export default ClientEntertainmentRequest;
