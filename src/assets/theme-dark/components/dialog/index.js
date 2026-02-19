/*Material Dashboard 2 React base styles*/
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";
import colors from "assets/theme-dark/base/colors";

const { borderRadius } = borders;
const { xxl } = boxShadows;
const { background, text } = colors;

const dialog = {
    styleOverrides: {
        paper: {
            borderRadius: borderRadius.lg,
            boxShadow: xxl,
            backgroundColor: background.card,
            color: text.main,
        },

        paperFullScreen: {
            borderRadius: 0,
        },
    },
};

export default dialog;
