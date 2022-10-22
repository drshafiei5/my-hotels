import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors'


const theme = createTheme(
    {
        palette: {
            success: {
                main: green[600]
            }
        },
        typography: {
            fontFamily: "IRANSans, sans-serif !important",
            fontSize: 14,
        },
    }
);

export default theme;