// @mui material components
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export default styled(TextField)(({ theme, ownerState }) => {
    const { palette, functions } = theme;
    const { error, success, disabled } = ownerState;

    const { grey, transparent, error: colorError, success: colorSuccess } = palette;
    const { pxToRem } = functions;
    const disabledBackground = palette.background?.card || grey[200];

    // styles for the input with error={true}
    const errorStyles = () => ({
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `right ${pxToRem(12)} center`,
        backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

        "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline, &:after": {
                borderColor: colorError.main,
            },
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: colorError.main,
        },
    });

    // styles for the input with success={true}
    const successStyles = () => ({
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `right ${pxToRem(12)} center`,
        backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

        "& .Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline, &:after": {
                borderColor: colorSuccess.main,
            },
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: colorSuccess.main,
        },
    });

    const numberIconSvg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' width='18' height='18'>
            <rect x='0.5' y='0.5' rx='4' ry='4' width='17' height='17' fill='none' stroke='${palette.text?.main || '#000'}' stroke-opacity='0.12' stroke-width='1'/>
            <path d='M6 7 L9 4 L12 7' fill='none' stroke='${palette.text?.main || '#000'}' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/>
            <path d='M6 11 L9 8 L12 11' fill='none' stroke='${palette.text?.main || '#000'}' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/>
        </svg>`
    );

    return {
        backgroundColor: disabled ? `${disabledBackground} !important` : transparent.main,
        pointerEvents: disabled ? "none" : "auto",
        ...(error && errorStyles()),
        ...(success && successStyles()),

        /* Custom number input appearance: hide native spinners and show rounded arrow icon */
        "& input[type='number']": {
            // remove native spin buttons
            "&::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
            "&::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
            MozAppearance: "textfield",
            paddingRight: pxToRem(48),
            backgroundImage: `url("data:image/svg+xml;utf8,${numberIconSvg}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `right ${pxToRem(12)} center`,
            backgroundSize: `${pxToRem(20)} ${pxToRem(20)}`,
        },
    };
});
