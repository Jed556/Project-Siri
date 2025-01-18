import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
    useMaterialUIController,
    setTransparentNavbar,
    setMiniSidenav,
    setOpenConfigurator,
} from "context";

import { readFileAsDataURL } from "utils/fileUtils"; // Import utility function to read file as data URL
import MasterSheetDb from "utils/MasterSheetDb"; // Import MasterSheetDb

function DashboardNavbar({ absolute, light, isMini }) {
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        transparentNavbar,
        fixedNavbar,
        openConfigurator,
        darkMode,
        sidenavColor,
    } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfileCard, setOpenProfileCard] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState("johndoe");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [profilePhoto, setProfilePhoto] = useState("/static/images/avatar/1.jpg"); // Default profile photo
    const route = useLocation().pathname.split("/").slice(1);
    const masterSheetDb = new MasterSheetDb(); // Initialize MasterSheetDb

    useEffect(() => {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType("sticky");
        } else {
            setNavbarType("static");
        }

        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        }

        /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
        window.addEventListener("scroll", handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener("scroll", handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUsername(user[0]);
            setFirstName(user[2]);
            setLastName(user[3]);
            setProfilePhoto(user[9] || "/static/images/avatar/1.jpg"); // Load profile photo from user data
        }
    }, []);

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const handleProfileCardToggle = () => setOpenProfileCard(!openProfileCard);
    const handleEditModeToggle = () => setEditMode(!editMode);
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        showSnackbar("Logged out successfully", "success");
        setTimeout(() => {
            window.location.href = "/authentication/sign-in";
        }, 1500);
    };

    const handleProfilePhotoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64Image = await readFileAsDataURL(file);
            setProfilePhoto(base64Image);
            const user = JSON.parse(localStorage.getItem("user"));
            user[9] = base64Image;
            localStorage.setItem("user", JSON.stringify(user));
            showSnackbar("Profile photo updated successfully", "success");
        }
    };

    const handleSaveProfile = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const updatedUser = await masterSheetDb.updateUser(user[4], {
                username,
                firstName,
                lastName,
                profilePhoto,
            });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            showSnackbar("Profile updated successfully", "success");
            setEditMode(false);
        } catch (error) {
            showSnackbar(`Error: ${error.message}`, "error");
        }
    };

    // Render the notifications menu
    // const renderMenu = () => (
    //   <Menu
    //     anchorEl={openMenu}
    //     anchorReference={null}
    //     anchorOrigin={{
    //       vertical: "bottom",
    //       horizontal: "left",
    //     }}
    //     open={Boolean(openMenu)}
    //     onClose={handleCloseMenu}
    //     sx={{ mt: 2 }}
    //   >
    //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
    //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
    //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    //   </Menu>
    // );

    // Styles for the navbar icons
    const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    return (
        <AppBar
            position={absolute ? "absolute" : navbarType}
            color="inherit"
            sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox
                    color="inherit"
                    mb={{ xs: 1, md: 0 }}
                    sx={(theme) => navbarRow(theme, { isMini })}
                >
                    <Breadcrumbs
                        icon="home"
                        title={route[route.length - 1]}
                        route={route}
                        light={light}
                    />
                </MDBox>
                {isMini ? null : (
                    <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                        {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
                        <MDBox color={light ? "white" : "inherit"}>
                            {/* <Link to="/authentication/sign-in">
                                <IconButton sx={navbarIconButton} size="small" disableRipple>
                                    <Icon sx={iconsStyle}>account_circle</Icon>
                                </IconButton>
                            </Link> */}
                            <IconButton
                                sx={navbarIconButton}
                                size="small"
                                disableRipple
                                onClick={handleProfileCardToggle}
                            >
                                <Icon sx={iconsStyle}>account_circle</Icon>
                            </IconButton>
                            {openProfileCard && (
                                <Card
                                    sx={{
                                        position: "absolute",
                                        top: "50px",
                                        right: "10px",
                                        zIndex: 10,
                                        p: 2,
                                        width: "300px",
                                    }}
                                >
                                    <CardContent>
                                        <MDBox
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id="profile-photo-upload"
                                                type="file"
                                                onChange={handleProfilePhotoChange}
                                            />
                                            <label htmlFor="profile-photo-upload">
                                                <Avatar
                                                    alt="Profile Photo"
                                                    src={profilePhoto}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </label>
                                        </MDBox>
                                        <MDInput
                                            label="Username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            fullWidth
                                            margin="normal"
                                            disabled={!editMode}
                                        />
                                        <MDInput
                                            label="First Name"
                                            value={firstName}
                                            onChange={handleFirstNameChange}
                                            fullWidth
                                            margin="normal"
                                            disabled={!editMode}
                                        />
                                        <MDInput
                                            label="Last Name"
                                            value={lastName}
                                            onChange={handleLastNameChange}
                                            fullWidth
                                            margin="normal"
                                            disabled={!editMode}
                                        />
                                        {editMode ? (
                                            <MDButton
                                                variant="contained"
                                                color={sidenavColor}
                                                fullWidth
                                                sx={{ mb: 1 }}
                                                onClick={handleSaveProfile} // Call handleSaveProfile on save
                                            >
                                                Save
                                            </MDButton>
                                        ) : (
                                            <MDButton
                                                variant="contained"
                                                color={sidenavColor}
                                                fullWidth
                                                sx={{ mb: 1 }}
                                                onClick={handleEditModeToggle}
                                            >
                                                Edit
                                            </MDButton>
                                        )}
                                        <MDButton
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </MDButton>
                                    </CardContent>
                                </Card>
                            )}
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarMobileMenu}
                                onClick={handleMiniSidenav}
                            >
                                <Icon sx={iconsStyle} fontSize="medium">
                                    {miniSidenav ? "menu_open" : "menu"}
                                </Icon>
                            </IconButton>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                onClick={handleConfiguratorOpen}
                            >
                                <Icon sx={iconsStyle}>settings</Icon>
                            </IconButton>
                            {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              ></IconButton>
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()} */}
                        </MDBox>
                    </MDBox>
                )}
            </Toolbar>
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
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
