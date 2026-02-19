/*Material Dashboard 2 React base styles*/
import colors from "assets/theme-dark/base/colors";

const { info, dark, white, grey, background } = colors;

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
        scrollbarColor: `${grey[600]} ${background.sidenav}`,
    },
    "*::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
    },
    "*::-webkit-scrollbar-track": {
        background: background.sidenav,
        borderRadius: 8,
    },
    "*::-webkit-scrollbar-thumb": {
        background: grey[600],
        borderRadius: 8,
    },
    "*::-webkit-scrollbar-thumb:hover": {
        background: info.main,
    },
    ".MuiPickersPopper-root .MuiPaper-root": {
        backgroundColor: background.card,
        border: `1px solid ${grey[700]}`,
    },
    ".MuiDayCalendar-day.Mui-disabled": {
        color: `${grey[600]} !important`,
    },
    ".MuiPickersDay-root .MuiTouchRipple-root": {
        display: "none",
    },
    ".PrivatePickersDay-root .MuiTouchRipple-root": {
        display: "none",
    },
    ".MuiPickersDay-root:not(.Mui-selected):hover": {
        backgroundColor: `${info.main}33 !important`,
    },
    ".MuiDayCalendar-day:not(.Mui-selected):hover": {
        backgroundColor: `${info.main}33 !important`,
    },
    ".MuiPickersDay-root.Mui-focusVisible:not(.Mui-selected)": {
        backgroundColor: "transparent !important",
        boxShadow: "none !important",
    },
    ".MuiDayCalendar-day.Mui-focusVisible:not(.Mui-selected)": {
        backgroundColor: "transparent !important",
        boxShadow: "none !important",
    },
    ".MuiPickersDay-root.Mui-selected": {
        backgroundColor: `${info.main} !important`,
        color: `${white.main} !important`,
        outline: "none",
        boxShadow: "none",
    },
    ".PrivatePickersDay-root.Mui-selected": {
        backgroundColor: `${info.main} !important`,
        color: `${white.main} !important`,
        outline: "none",
        boxShadow: "none",
    },
    ".MuiDayCalendar-day.Mui-selected": {
        backgroundColor: `${info.main} !important`,
        color: `${white.main} !important`,
        outline: "none",
        boxShadow: "none",
    },
    ".MuiPickersDay-root.Mui-selected:hover": {
        backgroundColor: `${info.main} !important`,
    },
    ".MuiDayCalendar-day.Mui-selected:hover": {
        backgroundColor: `${info.main} !important`,
    },
    ".MuiPickersDay-root.Mui-selected.Mui-focusVisible": {
        backgroundColor: `${info.main} !important`,
        boxShadow: "none",
    },
    ".MuiDayCalendar-day.Mui-selected.Mui-focusVisible": {
        backgroundColor: `${info.main} !important`,
        boxShadow: "none",
    },
    ".MuiPickersDay-root.MuiPickersDay-today": {
        border: `1px solid ${info.main} !important`,
        backgroundColor: "transparent !important",
    },
    ".MuiDayCalendar-day.MuiPickersDay-today": {
        border: `1px solid ${info.main} !important`,
        backgroundColor: "transparent !important",
    },
    ".MuiPickersDay-root.Mui-selected.MuiPickersDay-today": {
        border: `1px solid ${white.main} !important`,
    },
    ".MuiDayCalendar-day.Mui-selected.MuiPickersDay-today": {
        border: `1px solid ${white.main} !important`,
    },
    ".MuiPickersCalendarHeader-label, .MuiDayCalendar-weekDayLabel": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersArrowSwitcher-button": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersCalendarHeader-switchViewButton": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersLayout-root .MuiIconButton-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersTextField-root input, .MuiPickersInputBase-root input": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersTextField-root .MuiSvgIcon-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiInputAdornment-root .MuiSvgIcon-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiIconButton-root .MuiSvgIcon-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersPopper-root .MuiPaper-root .MuiSvgIcon-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersPopper-root .MuiPaper-root *": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersPopper-root .MuiPaper-root .MuiButtonBase-root": {
        color: `${white.main}CC !important`,
    },
    ".MuiPickersPopper-root .MuiPaper-root .MuiPickersDay-root": {
        color: `${white.main}CC !important`,
    },
};

export default globals;
