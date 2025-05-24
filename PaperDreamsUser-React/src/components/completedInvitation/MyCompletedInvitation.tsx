// import { Grid, Typography, Box, CircularProgress, Container, Paper } from "@mui/material";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ShowCompletedInvitation from "./ShowCompletedInvitation";
// import { fetchCompletedInvitation } from "../../redux/CompletedInvitationsSlice";
// import { AppDispatch, RootState } from "../../redux/Store";
// import { motion } from "framer-motion";

// export default function MyCompletedInvitationPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const listCompletedInvitation = useSelector((state: RootState) => state.CompletedInvitation.listCompletedInvitation);
//   const listLoading = useSelector((state: RootState) => state.CompletedInvitation.loading);

//   useEffect(() => {
//     dispatch(fetchCompletedInvitation());
//   }, [dispatch]);

//   return (
//     <Container
//       maxWidth="xl"
//       component={motion.div}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       sx={{
//         py: { xs: 4, md: 6 },
//         minHeight: '100vh',
//         direction: "rtl",
//       }}
//     >
//       {listLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "70vh",
//           }}
//         >
//           <CircularProgress size={60} sx={{ color: "primary.main" }} />
//         </Box>
//       ) : (
//         <>
//           <Paper
//             elevation={3}
//             sx={{
//               p: { xs: 3, md: 5 },
//               mb: 5,
//               borderRadius: 4,
//               background: "primary.main",
//               color: "white",
//               textAlign: "center",
//               boxShadow: 4,
//             }}
//           >
//             <Typography
//               variant="h3"
//               fontSize={{ xs: "2rem", md: "2.75rem" }}
//               fontWeight={700}
//               gutterBottom
//             >
//               ההזמנות המושלמות שלי
//             </Typography>
//             <Typography variant="h6" fontWeight={400}>
//               כל ההזמנות שיצרת מוצגות כאן
//             </Typography>
//           </Paper>

//           {listCompletedInvitation.length > 0 ? (
//             <Grid container spacing={4} justifyContent="center">
//               {listCompletedInvitation.map((item, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={4}
//                   key={index}
//                   display="flex"
//                   justifyContent="center"
//                   component={motion.div}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <ShowCompletedInvitation fileName={item.name} time={item.createdAt} />
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Paper
//               elevation={2}
//               sx={{
//                 p: 6,
//                 mt: 4,
//                 width: "100%",
//                 borderRadius: 3,
//                 textAlign: "center",
//                 bgcolor: "#f1f3f4",
//               }}
//               component={motion.div}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <Typography
//                 variant="h5"
//                 fontWeight={500}
//                 color="text.secondary"
//               >
//                 לא נמצאו הזמנות שהושלמו
//               </Typography>
//               <Typography sx={{ mt: 1.5, color: "#777" }}>
//                 צור הזמנה חדשה כדי שתופיע כאן ✨
//               </Typography>
//             </Paper>
//           )}
//         </>
//       )}
//     </Container>
//   );
// }





import { useState, useEffect } from "react";
import {
  Grid, Typography, Box, CircularProgress, Container, Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShowCompletedInvitation from "./ShowCompletedInvitation";
import { fetchCompletedInvitation } from "../../redux/CompletedInvitationsSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { motion } from "framer-motion";
import MultiFileDownload from "./MultiFileDownload";

export default function MyCompletedInvitationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const list = useSelector((state: RootState) => state.CompletedInvitation.listCompletedInvitation);
  const loading = useSelector((state: RootState) => state.CompletedInvitation.loading);

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchCompletedInvitation());
  }, [dispatch]);

  const toggleSelect = (fileName: string) => {
    setSelected((prev) =>
      prev.includes(fileName) ? prev.filter(f => f !== fileName) : [...prev, fileName]
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ py: { xs: 4, md: 6 }, minHeight: '100vh', direction: "rtl" }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <Paper
  elevation={3}
  sx={{
    p: { xs: 2, md: 3 },
    mb: 5,
    borderRadius: 4,
    textAlign: "center",
    bgcolor: "primary.main", // צבע רקע
    color: "white",
  }}
>
  <Typography
    variant="h3"
    fontSize={{ xs: "2rem", md: "2.75rem" }}
    fontWeight={700}
    gutterBottom
  >
    ההזמנות המושלמות שלי
  </Typography>
  <Typography variant="h6" fontWeight={400}>
    כל ההזמנות שיצרת מוצגות כאן
  </Typography>
</Paper>

<Box display="flex" justifyContent="flex-start" sx={{direction:'rtl'}} mb={2}>
  <MultiFileDownload
    selectedFiles={selected}
    onClearSelection={clearSelection}
  />
</Box>

          <Grid container spacing={4} justifyContent="center" mt={1}>
            {list.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                <ShowCompletedInvitation
                  fileName={item.name}
                  time={item.createdAt}
                  isSelected={selected.includes(item.name)}
                  onToggleSelect={toggleSelect}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
