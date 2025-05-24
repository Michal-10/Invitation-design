import { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { Close, Email, Send, CheckCircle } from "@mui/icons-material";
import axios from "axios";

interface EmailSendProps {
  fileName: string;
  imageUrl: string | null;
  buttonText?: string;
  showIcon?: boolean;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
}

export default function EmailSend({
  fileName,
  imageUrl,
  buttonText = "שלח במייל",
  showIcon = true,
  variant = "contained",
  size = "medium",
}: EmailSendProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSendEmail = async () => {
    if (!validateEmail(emailTo)) {
      setError("כתובת אימייל אינה תקינה");
      return;
    }

    try {
      setSending(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/CompletedInvitation/send`, {
        To: emailTo,
        Message: message,
        ImageUrl: imageUrl,
        FileName: fileName,
      });

      setEmailTo("");
      setMessage("");
      setShowSuccess(true);
      setOpenDialog(false);
    } catch (error: any) {
      console.error("שגיאה בשליחת המייל:", error);

      if (error.response?.status === 400 && typeof error.response.data === "string") {
        setError("שליחה נכשלה: " + error.response.data);
      } else {
        setError("שליחת המייל נכשלה. נסה שוב.");
      }
    } finally {
      setSending(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
    setError(null);
  };

  return (
    <Box>
      {/* כפתור פתיחת הדיאלוג */}
      <Button
        onClick={() => setOpenDialog(true)}
        variant={variant}
        color="primary"
        size={size}
        startIcon={showIcon ? <Email sx={{marginLeft:'4px'}}/> : undefined}
        sx={{
          borderRadius: "20px",
          bgcolor: variant === "contained" ? "var(--primary-color)" : undefined,
          "&:hover": {
            bgcolor: variant === "contained" ? "#e05e52" : undefined,
          },
        }}
      >
        {buttonText}
      </Button>

      {/* דיאלוג לשליחת מייל */}
      <Dialog
        open={openDialog}
        onClose={() => !sending && setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            overflow: "hidden",
            minWidth: { xs: "90%", sm: 400 },
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "var(--primary-color)",
            color: "white",
            fontFamily: "'Heebo', sans-serif",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "rtl",
          }}
        >
          שליחת הזמנה במייל
          {!sending && (
            <IconButton onClick={() => setOpenDialog(false)} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          )}
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 1, direction: "rtl" }}>
          <TextField
            autoFocus
            margin="dense"
            label="כתובת אימייל"
            type="email"
            fullWidth
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontFamily: "'Heebo', sans-serif",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "'Heebo', sans-serif",
              },
              "& .MuiButton-startIcon": {
                marginLeft: 1, // רווח תקני בין האייקון לטקסט
              },
            }}
            InputProps={{
              startAdornment: <Email sx={{ marginLeft:'2px' }} color="primary" />,
            }}
          />

          <TextField
            margin="dense"
            label="הודעה אישית"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontFamily: "'Heebo', sans-serif",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "'Heebo', sans-serif",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => [!sending && setOpenDialog(false),
              setEmailTo(""),
              setMessage("")]}
            sx={{
              color: "var(--primary-color)",
              fontFamily: "'Heebo', sans-serif",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "rgba(255,111,97,0.1)",
              },
            }}
            disabled={sending}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSendEmail}
            variant="contained"
            disabled={sending}
            startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <Send />}
            sx={{
              bgcolor: "var(--primary-color)",
              "&:hover": {
                bgcolor: "#e05e52",
              },
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(255,111,97,0.2)",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "'Heebo', sans-serif",
              px: 3,
            }}
          >
            {sending ? "שולח..." : "שלח"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/error */}
      <Snackbar
        open={showSuccess || !!error}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          variant="filled"
          icon={!error ? <CheckCircle /> : undefined}
        >
          {error || "המייל נשלח בהצלחה!"}
        </Alert>
      </Snackbar>
    </Box>
  );
}