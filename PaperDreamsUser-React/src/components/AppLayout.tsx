// import { Box } from "@mui/material"
// import Header from "./homePage/Header"
// import { Outlet } from "react-router"
// import Footer from "./homePage/Footer"

import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Footer from "./homePage/Footer";
import Header from "./homePage/Header";


// export default () => {
//   return (<>

// <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: `64px`,
//           zIndex: 1000,
//           bgcolor: "white", // רקע כדי שלא יסתיר תוכן מאחור
//           // boxShadow: 1,
//         }}
//       >
//         <Header />
//       </Box>

//       <Box sx={{ pt: `64px`, minHeight: "100vh" }}>
//         <Outlet />
//         <Footer />
//       </Box>
//     </>
//   )
// }



export default () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header קבוע עליון */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `64px`,
          zIndex: 1000,
          bgcolor: "white",
        }}
      >
        <Header />
      </Box>

      {/* תוכן הדף - לוקח את כל הגובה שנותר */}
      <Box sx={{ pt: `64px`, flex: 1 }}>
        <Outlet />
      </Box>

      {/* Footer תמיד בתחתית המסך */}
      <Footer />
    </Box>
  );
};
