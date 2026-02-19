/*Material Dashboard 2 React base styles*/
import colors from "assets/theme/base/colors";

const { info, dark, white, grey } = colors;

const globals = {
    html: {
        scrollBehavior: "smooth",
    },
    "*, *::before, *::after": {
        margin: 0,
        padding: 0,
    },
    "a, a:link, a:visited": {
        textDecoration: "none !important",
    },
    "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
        color: `${dark.main} !important`,
        transition: "color 150ms ease-in !important",
    },
    "a.link:hover, .link:hover, a.link:focus, .link:focus": {
        color: `${info.main} !important`,
    },
    "*": {
        scrollbarWidth: "thin",
        scrollbarColor: `${grey[500]} ${grey[200]}`,
    },
    "*::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
    },
    "*::-webkit-scrollbar-track": {
        background: grey[200],
        borderRadius: 8,
    },
    "*::-webkit-scrollbar-thumb": {
        background: grey[500],
        borderRadius: 8,
    },
    "*::-webkit-scrollbar-thumb:hover": {
        background: dark.main,
    },
    ".MuiPickersPopper-root .MuiPaper-root": {
        backgroundColor: white.main,
        border: `1px solid ${grey[300]}`,
    },
    ".MuiPickersDay-root .MuiTouchRipple-root, .PrivatePickersDay-root .MuiTouchRipple-root": {
        display: "none",
    },
    ".MuiPickersDay-root:not(.Mui-selected):hover, .MuiDayCalendar-day:not(.Mui-selected):hover": {
        backgroundColor: `${info.main}22 !important`,
    },
    ".MuiPickersDay-root.Mui-focusVisible:not(.Mui-selected), .MuiDayCalendar-day.Mui-focusVisible:not(.Mui-selected)": {
        backgroundColor: "transparent !important",
        boxShadow: "none !important",
    },
    ".MuiPickersDay-root.Mui-selected, .PrivatePickersDay-root.Mui-selected, .MuiDayCalendar-day.Mui-selected": {
        backgroundColor: `${info.main} !important`,
        color: `${white.main} !important`,
        outline: "none",
        boxShadow: "none",
    },
    ".MuiPickersDay-root.Mui-selected:hover, .MuiDayCalendar-day.Mui-selected:hover": {
        backgroundColor: `${info.main} !important`,
    },
    ".MuiPickersDay-root.Mui-selected.Mui-focusVisible, .MuiDayCalendar-day.Mui-selected.Mui-focusVisible": {
        backgroundColor: `${info.main} !important`,
        boxShadow: "none",
    },
    ".MuiPickersDay-root.MuiPickersDay-today, .MuiDayCalendar-day.MuiPickersDay-today": {
        border: `1px solid ${info.main} !important`,
        backgroundColor: "transparent !important",
    },
    ".MuiPickersDay-root.Mui-selected.MuiPickersDay-today, .MuiDayCalendar-day.Mui-selected.MuiPickersDay-today": {
        border: `1px solid ${white.main} !important`,
    },
    ".MuiPickersCalendarHeader-label, .MuiDayCalendar-weekDayLabel": {
        color: `${dark.main} !important`,
    },
    ".MuiPickersArrowSwitcher-button, .MuiPickersCalendarHeader-switchViewButton, .MuiPickersLayout-root .MuiIconButton-root": {
        color: `${dark.main} !important`,
    },
    ".MuiPickersTextField-root input, .MuiPickersInputBase-root input": {
        color: `${dark.main} !important`,
    },
    ".MuiPickersTextField-root .MuiSvgIcon-root, .MuiInputAdornment-root .MuiSvgIcon-root, .MuiIconButton-root .MuiSvgIcon-root, .MuiPickersPopper-root .MuiPaper-root .MuiSvgIcon-root": {
        color: `${dark.main} !important`,
    },
    /* Fallback: force all descendant text/buttons inside the picker popper to inherit light-mode colors */
    ".MuiPickersPopper-root .MuiPaper-root *": {
        color: `${dark.main} !important`,
    },
    ".MuiPickersPopper-root .MuiPaper-root .MuiButtonBase-root, .MuiPickersPopper-root .MuiPaper-root .MuiPickersDay-root": {
        color: `${dark.main} !important`,
    },
};

export default globals;
