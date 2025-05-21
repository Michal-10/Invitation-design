import  { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { googleLogin, loginRegister } from "../../redux/UserSlice";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

export default function AuthPage() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";

    setLoading(true);
    setError("");

    try {
      await dispatch(
        loginRegister({
          user: {
            email,
            password,
            firstName: mode === "register" ? firstName : undefined,
            lastName: mode === "register" ? lastName : undefined,
          },
          status: mode,
          // Add a default or appropriate status value
        })
      ).unwrap();
      navigate("/"); // Redirect to home page after successful login/register
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await dispatch(googleLogin()).unwrap();
      navigate("/"); // Redirect to home page after successful login/register
    } catch (err: any) {
      setError("התחברות עם גוגל נכשלה 😞");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        overflow: "hidden",
      }}
    >








      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "90%",
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {mode === "login" ? "התחברות" : "הרשמה"}
        </Typography>

        {mode === "register" && (
          <>
            <TextField
              label="שם פרטי"
              fullWidth
              inputRef={firstNameRef}
              sx={{ mt: 2 }}
            />
            <TextField
              label="שם משפחה"
              fullWidth
              inputRef={lastNameRef}
              sx={{ mt: 2 }}
            />
          </>
        )}

        <TextField
          label="אימייל"
          fullWidth
          inputRef={emailRef}
          sx={{ mt: 2 }}
        />
        <TextField
          label="סיסמה"
          type="password"
          fullWidth
          inputRef={passwordRef}
          sx={{ mt: 2 }}
        />

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 3 }} 
          component={Link}
          to="/"
        >
          {loading ? "טוען..." : mode === "login" ? "התחבר" : "הרשם"}
        </Button>



        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          התחברות עם Google
        </Button>



        <Button
          fullWidth
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          sx={{ mt: 1 }}
         
        >
          {mode === "login"
            ? "אין לך חשבון? לחץ כאן להרשמה"
            : "יש לך חשבון? התחבר"}
        </Button>
      </Paper>
    </Box>
  );
}
