import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
        main: "#ff6f61",       
        light: "#ffa091",      
        dark: "#c43e36",       
        contrastText: "#ffffff",
      },
    secondary: {
        main: "#8cc6d9",       
        light: "#c6e2ec",      
        dark: "#205060",       
        contrastText: "#000000",
      },
    background: {
        default: "#f5f5f5",    
        paper: "#ffffff",      
    },
    text: {
        primary: "#333333",    
        secondary: "#666666",  
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
