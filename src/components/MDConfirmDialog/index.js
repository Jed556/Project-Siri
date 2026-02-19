import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function MDConfirmDialog({
    open,
    title,
    content,
    confirmText,
    cancelText,
    confirmColor,
    onConfirm,
    onClose,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "0.75rem",
                },
            }}
        >
            <DialogTitle>
                <MDTypography variant="h6">{title}</MDTypography>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <MDTypography variant="button" color="text">
                        {content}
                    </MDTypography>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <MDButton variant="outlined" color="secondary" onClick={onClose}>
                    {cancelText}
                </MDButton>
                <MDButton variant="contained" color={confirmColor} onClick={onConfirm}>
                    {confirmText}
                </MDButton>
            </DialogActions>
        </Dialog>
    );
}

MDConfirmDialog.defaultProps = {
    title: "Confirm Action",
    content: "Are you sure you want to continue?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmColor: "error",
};

MDConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmColor: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MDConfirmDialog;
