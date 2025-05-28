import { Box, Button, CircularProgress, IconButton, Paper, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { User } from "../../models/User";
import { updateUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const UpdateUser = () => {
    const [, setOpenModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email: null | string, phone: null | string, password: null | string }>({ email: null, phone: null, password:null });

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const checkEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRef.current?.value) {
            if (!emailRegex.test(emailRef.current.value)) {
                setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address." }));
                return false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: null }));
                return true;
            }
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerError(null);
        setErrors({ email: null, phone: null, password:null });

        const newErrors: typeof errors = { email: null, phone: null, password: null };

        if (!passwordRef.current?.value) {
            newErrors.password = "לא הוזנה סיסמא, שדה חובה";
        }
    
        const validEmail = checkEmail();
        if (!validEmail) {
            newErrors.email = "אימייל לא חוקי";
        }
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).some(error => error !== null)) {
            return;
        }

        setLoading(true);
        const userData: Partial<User> = {
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email,
            password: passwordRef.current?.value || user.password
        };

        try {
            const res = await dispatch(updateUser({ user: userData })).unwrap();
            sessionStorage.setItem('userToken', res.token);

            setOpenModal(false);
            navigate('/');
        } catch (err: any) {
            setServerError("אירעה שגיאה בעת העדכון. נסה שוב.");
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
                    border: "1.5px solid #ff6f61",
                }}
            >

                <IconButton onClick={() => setOpenModal(false)} sx={{ position: 'absolute', top: 13, right: 13 }}>
                    <CloseIcon />
                </IconButton>

                <Typography variant="h5" sx={{ color: 'black', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>עדכון משתמש</Typography>
                <TextField label='firstName' defaultValue={user.firstName} variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
                <TextField label='lastName' defaultValue={user.lastName} variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
                <TextField label='email' defaultValue={user.email} variant="filled" margin="normal" fullWidth type="email" inputRef={emailRef} />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                <TextField label='password' defaultValue={user.password} variant="filled" margin="normal" fullWidth type="password" inputRef={passwordRef} helperText={'שדה חובה'} required/>
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                {serverError && <Typography color="error" sx={{ mt: 1 }}>{serverError}</Typography>}
                <Button
                    sx={{ backgroundColor: 'var(--primary-color)', mt: 2 }}
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "שמירת שינויים"}
                </Button>
            </Paper>
        </Box>
    );
}

export default UpdateUser;
