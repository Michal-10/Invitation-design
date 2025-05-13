
import { Grid, Typography, Box, CircularProgress, Container, Paper } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowCompletedInvitation from "./ShowCompletedInvitation";
import { fetchCompletedInvitation } from "../../redux/CompletedInvitationsSlice";
import { AppDispatch, RootState } from "../../redux/Store";

export default function MyCompletedInvitationPage() {
  const dispatch = useDispatch<AppDispatch>()
  const listCompletedInvitation = useSelector((state: RootState) => state.CompletedInvitation.listCompletedInvitation)
  const listLoading = useSelector((state: RootState) => state.CompletedInvitation.loading)

  useEffect(() => {
    console.log("listCompletedInvitation");
    dispatch(fetchCompletedInvitation())
  }, [dispatch])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {listLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress size={60} sx={{ color: "var(--primary-color)" }} />
        </Box>
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: "linear-gradient(to right, var(--primary-color), #e05e52)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: "bold",
                direction: "rtl",
              }}
            >
              ההזמנות המושלמות שלי
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, direction: "rtl", fontWeight: "normal" }}>
              כל ההזמנות שיצרת מוצגות כאן
            </Typography>
          </Paper>

          <Grid container spacing={4} justifyContent="center">
            {listCompletedInvitation.length > 0 ? (
              listCompletedInvitation.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
                  <ShowCompletedInvitation fileName={item.name} time={item.createdAt}/>
                </Grid>
              ))
            ) : (
              <Paper
                elevation={2}
                sx={{
                  p: 6,
                  mt: 4,
                  width: "90vw",
                  borderRadius: 3,
                  textAlign: "center",
                  bgcolor: "#f8f9fa",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "medium",
                    color: "#666",
                    direction: "rtl",
                  }}
                >
                  לא נמצאו הזמנות שהושלמו
                </Typography>
                <Typography sx={{ mt: 2, color: "#888", direction: "rtl" }}>צור הזמנה חדשה כדי שתופיע כאן</Typography>
              </Paper>
            )}
          </Grid>
        </>
      )}
    </Container>
  )
}

// import { useState } from 'react';
// import { Card, CardContent, CardMedia, Button, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import SendIcon from '@mui/icons-material/Send';
// import CloseIcon from '@mui/icons-material/Close';

// // הגדרת הפרופס שהקומפוננטה מקבלת
// interface ShowCompletedInvitationProps {
//   fileName: string;
//   time: string;
//   // השם של הקובץ יהיה גם שם התמונה שנשלחת
// }

// export default function ShowCompletedInvitation({ fileName, time }: ShowCompletedInvitationProps) {
//   // סטייטים לניהול הדיאלוג והאימייל
//   const [openDialog, setOpenDialog] = useState(false);
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

//   // פונקציה לפתיחת הדיאלוג
//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//     setEmail('');
//     setEmailError(false);
//   };

//   // פונקציה לסגירת הדיאלוג
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   // בדיקת תקינות כתובת האימייל
//   const isValidEmail = (email: string) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   // טיפול בשינוי כתובת האימייל
//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setEmailError(!isValidEmail(value) && value !== '');
//   };

//   // פונקציה לשליחת המייל
//   const handleSendEmail = async () => {
//     if (!isValidEmail(email)) {
//       setEmailError(true);
//       return;
//     }

//     try {
//       // כאן נצטרך להוסיף קריאת API שתשלח את התמונה למייל
//       // זה יהיה משהו כמו:
//       const response = await fetch('/api/send-invitation-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           fileName,
//         }),
//       });
      
//       if (response.ok) {
//         setSnackbarMessage(`ההזמנה נשלחה בהצלחה ל-${email}`);
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//         handleCloseDialog();
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'שגיאה בשליחת המייל');
//       }
//     } catch (error) {
//       console.error('שגיאה בשליחת המייל:', error);
//       setSnackbarMessage('שגיאה בשליחת המייל, נסה שוב מאוחר יותר');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     }
//   };

//   // פורמט התאריך להצגה
//   const formattedDate = new Date(time).toLocaleDateString('he-IL');

//   return (
//     <>
//       <Card sx={{ maxWidth: 345, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
//         <CardMedia
//           component="img"
//           height="200"
//           image={`/api/completed-invitations/${fileName}`} // הנתיב לתמונת ההזמנה
//           alt="הזמנה שהושלמה"
//         />
//         <CardContent>
//           <Box sx={{ direction: 'rtl' }}>
//             <Typography variant="body2" color="text.secondary" textAlign="center">
//               נוצר בתאריך: {formattedDate}
//             </Typography>
//           </Box>
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
//             <Button
//               variant="contained"
//               startIcon={<EmailIcon />}
//               onClick={handleOpenDialog}
//               sx={{
//                 backgroundColor: 'var(--primary-color)',
//                 '&:hover': { backgroundColor: '#c94c40' },
//                 borderRadius: 2,
//               }}
//             >
//               שלח במייל
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* דיאלוג להזנת אימייל */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} dir="rtl">
//         <DialogTitle>שליחת הזמנה במייל</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             הזן את כתובת המייל אליה תרצה לשלוח את ההזמנה
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="כתובת אימייל"
//             type="email"
//             fullWidth
//             variant="outlined"
//             value={email}
//             onChange={handleEmailChange}
//             error={emailError}
//             helperText={emailError ? 'אנא הזן כתובת מייל תקינה' : ''}
//             sx={{ mt: 2 }}
//             inputProps={{ dir: 'ltr' }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} startIcon={<CloseIcon />} color="inherit">
//             ביטול
//           </Button>
//           <Button
//             onClick={handleSendEmail}
//             variant="contained"
//             startIcon={<SendIcon />}
//             disabled={!email || emailError}
//             sx={{
//               backgroundColor: 'var(--primary-color)',
//               '&:hover': { backgroundColor: '#c94c40' },
//             }}
//           >
//             שלח
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* הודעת התראה */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }