// import  { useState } from "react";
// import { Box, Button } from "@mui/material";
// // import LoginRegisterWithApi from "./LoginRegisterWithApi";

// export default function LoginPage() {
//   const [signInOrUp, setSignInOrUp] = useState<"login" | "register" | null>(null);
//   // const [, setHideBtns] = useState<boolean>(false);

//   // const handleCloseModal = () => {
//   //   setSignInOrUp(null);
//   // };

//   return (
//     <Box
//       sx={{
//         height: "100vh", // גובה מלא של חלון הדפדפן
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center", // יישור אנכי למרכז
//         alignItems: "center", // יישור אופקי למרכז
//         gap: 3, // רווח בין האלמנטים
//         bgcolor: "#f9f9f9", // רקע בהיר לדוגמה
//         p: 2,
//       }}
//     >
//       {/* כפתורי הרשמה והתחברות */}
//       <Box sx={{ display: "flex", gap: 4 }}>
//         <Button
//           variant={signInOrUp === "register" ? "contained" : "outlined"}
//           color="primary"
//           sx={{ fontWeight: 600, px: 4 }}
//           onClick={() => setSignInOrUp("register")}
//         >
//           הרשמה
//         </Button>
//         <Button
//           variant={signInOrUp === "login" ? "contained" : "outlined"}
//           color="primary"
//           sx={{ fontWeight: 600, px: 4 }}
//           onClick={() => setSignInOrUp("login")}
//         >
//           התחברות
//         </Button>
//       </Box>

//       {/* הטופס לפי הבחירה */}
//       {/* {signInOrUp && (
//         <Box sx={{ width: { xs: "90vw", sm: 400 }, mt: 3 }}>
//           <LoginRegisterWithApi
//             status={signInOrUp}
//             setHideBtns={setHideBtns}
//             handleCloseModal={handleCloseModal}
//           />
//         </Box>
//       )} */}
//     </Box>
//   );
// }
