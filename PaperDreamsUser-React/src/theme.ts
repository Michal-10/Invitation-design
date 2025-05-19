import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#338099",       // 40%
      light: "#79bcd2",      // 65%
      dark: "#19404d",       // 20%
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8cc6d9",       // 70%
      light: "#c6e2ec",      // 85%
      dark: "#205060",       // 25%
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",    // רקע כללי (כמעט לבן)
      paper: "#ffffff",      // רקע כרטיסים
    },
    text: {
      primary: "#333333",    // טקסט ראשי
      secondary: "#666666",  // טקסט משני
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
});

export default theme;
