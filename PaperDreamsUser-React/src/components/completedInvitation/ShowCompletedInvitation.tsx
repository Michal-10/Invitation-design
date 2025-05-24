

// import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography, Fade, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { CalendarToday } from "@mui/icons-material";
// import FileDownload from "./FileDownload";
// import { useEffect, useState } from "react";
// import { getDownloadURL } from "../../Services/FileService";
// import axios from "axios";
// import SendEmail from "./SendEmail";

// export default function ShowCompletedInvitation({ fileName, time }: { fileName: string, time: Date }) {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [emailTo, setEmailTo] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchFileUrl = async () => {
//       try {
//         setLoading(true);
//         const url = await getDownloadURL(fileName);
//         setImageUrl(url);
//       } catch (error) {
//         console.error("Error fetching image URL:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFileUrl();
//   }, [fileName]);

//   const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email.toLowerCase());
//   };

//   const handleSendEmail = async () => {
//     if (!validateEmail(emailTo)) {
//       alert("כתובת אימייל אינה תקינה");
//       return;
//     }

//     try {
//        await axios.post(`${import.meta.env.VITE_API_URL}/CompletedInvitation/send`, {
//         To: emailTo,
//         Message: message,
//         ImageUrl: imageUrl,
//         FileName: fileName,
//       });

//       alert("המייל נשלח בהצלחה!");
//       setOpenDialog(false);
//       setEmailTo("");
//       setMessage("");
//     } catch (error: any) {
//       console.error("שגיאה בשליחת המייל:", error);

//       if (error.response?.status === 400 && typeof error.response.data === "string") {
//         alert("שליחה נכשלה: " + error.response.data); // הצגת השגיאה מהשרת (למשל: "כתובת האימייל שגויה או לא קיימת")
//       } else {
//         alert("שליחת המייל נכשלה. נסה שוב.");
//       }
//     }
//   };


//   return (
//     <Fade in={true} timeout={500}>
//       <Card sx={{ width: 350, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderRadius: 4, overflow: "hidden", position: "relative", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 12px 28px rgba(0,0,0,0.2)", }, }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 250, bgcolor: "#f8f9fa" }}>
//             <CircularProgress size={50}  color="secondary" />
//           </Box>
//         ) : (
//           <>
//             <CardMedia component="img" height={250} image={imageUrl || "/placeholder.svg?height=250&width=350"} alt={fileName} sx={{ objectFit: "contain", bgcolor: "white", p: 2 }} />
//             <CardContent sx={{ pb: 1, direction: "rtl" }}>
//               <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary", mb: 1 }}>
//                 <CalendarToday fontSize="small" color="primary" />
//                 <Typography variant="body2" sx={{ ml: 1, paddingRight:'5px'}}>
//                   {' תאריך יצירה '+ new Date(time).toLocaleDateString('he-IL')}
//                 </Typography>
//               </Box>
//             </CardContent>
//             <CardActions sx={{ justifyContent: "space-between", p: 5, pt: 0 }}>
//               <FileDownload fileName={fileName} />
//               {/* <Button onClick={() => setOpenDialog(true)} size="small" color="primary">שלח במייל</Button> */}
//               <SendEmail
//                 fileName={fileName}
//                 imageUrl={imageUrl}
//               />
//             </CardActions>

//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//               <DialogTitle>שליחת הזמנה במייל</DialogTitle>
//               <DialogContent>
//                 <TextField autoFocus margin="dense" label="כתובת אימייל" type="email" fullWidth value={emailTo} onChange={(e) => setEmailTo(e.target.value)} />
//                 <TextField margin="dense" label="הודעה אישית" type="text" fullWidth multiline rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
//                 <Button onClick={handleSendEmail} variant="contained">שלח</Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         )}
//       </Card>
//     </Fade>
//   );
// }




import { Box, Card, CardActions, CardContent, CardMedia, Checkbox, Typography, CircularProgress } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import FileDownload from "./FileDownload";
import { useEffect, useState } from "react";
import { getDownloadURL } from "../../Services/FileService";
import SendEmail from "./SendEmail";

interface Props {
  fileName: string;
  time: Date;
  isSelected: boolean;
  onToggleSelect: (fileName: string) => void;
}

export default function ShowCompletedInvitation({ fileName, time, isSelected, onToggleSelect }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setLoading(true);
        const url = await getDownloadURL(fileName);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, [fileName]);

  return (
    <Card sx={{ width: 350, borderRadius: 4, position: "relative" }}>
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(fileName)}
        sx={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}
        color="primary"
      />

      {loading ? (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={250}
        sx={{ bgcolor: "#f8f9fa" }}
      >
        <CircularProgress size={40} color="primary" />
        <Typography variant="body2" color="text.secondary" mt={2}>
          טוען הזמנה...
        </Typography>
      </Box>
      ) : (
        <>
          <CardMedia
            component="img"
            height={250}
            image={imageUrl || "/placeholder.svg"}
            alt={fileName}
            sx={{ objectFit: "contain", bgcolor: "white", p: 2 }}
          />
          <CardContent sx={{ direction: "rtl" }}>
            <Box display="flex" alignItems="center" color="text.secondary">
              <CalendarToday fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {" תאריך יצירה " + new Date(time).toLocaleDateString("he-IL")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
            <FileDownload fileName={fileName} />
            <SendEmail fileName={fileName} imageUrl={imageUrl} />
          </CardActions>
        </>
      )}
    </Card>
  );
}
