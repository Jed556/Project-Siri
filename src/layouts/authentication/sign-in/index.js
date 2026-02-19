// React components
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Firebase Auth
import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Basic() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            showSnackbar(`Welcome back!`, "success");
            setTimeout(() => navigate("/dashboard"), 300);
        } catch (error) {
            const messages = {
                "auth/user-not-found": "No account found with this email",
                "auth/wrong-password": "Invalid password",
                "auth/invalid-email": "Invalid email format",
                "auth/invalid-credential": "Invalid email or password",
            };
            showSnackbar(messages[error.code] || error.message, "error");
        }
    };

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Sign in
                    </MDTypography>
                    <MDTypography display="block" variant="button" color="white" my={1}>
                        Welcome back!
                    </MDTypography>
                    {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                        <Grid item xs={2}>
                            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                                <FacebookIcon color="inherit" />
                            </MDTypography>
                        </Grid>
                        <Grid item xs={2}>
                            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                                <GitHubIcon color="inherit" />
                            </MDTypography>
                        </Grid>
                        <Grid item xs={2}>
                            <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                                <GoogleIcon color="inherit" />
                            </MDTypography>
                        </Grid>
                    </Grid> */}
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="password"
                                label="Password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </MDBox>
                        {/* <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                onClick={handleSetRememberMe}
                                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                            >
                                &nbsp;&nbsp;Remember me
                            </MDTypography>
                        </MDBox> */}
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                onClick={handleSignIn}
                                fullWidth
                            >
                                sign in
                            </MDButton>
                        </MDBox>
                        <MDBox mt={3} mb={1} textAlign="center">
                            <MDTypography variant="button" color="text">
                                Don&apos;t have an account?{" "}
                                <MDTypography
                                    component={Link}
                                    to="/authentication/sign-up"
                                    variant="button"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                    Sign up
                                </MDTypography>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
            <MDSnackbar
                color={snackbar.severity}
                icon="notifications"
                title={snackbar.severity === "success" ? "Log In Successful" : "Log In Failed"}
                content={snackbar.message}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                close={handleSnackbarClose}
                bgWhite
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </BasicLayout>
    );
}

export default Basic;
