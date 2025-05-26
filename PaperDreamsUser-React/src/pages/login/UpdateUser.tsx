// import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material"
// import CloseIcon from "@mui/icons-material/Close";
// import { FormEvent, useRef, useState } from "react"
// import { styleModal } from "../../models/style";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/Store";
// import { User } from "../../models/User";
// import { updateUser } from "../../redux/UserSlice";
// import { useNavigate } from "react-router";
// // import LoginStore from "../global-state/mobX/LoginStore";
// // import { UserContext } from "../UserContextReducer";



// // const UpdateUser = ({ setClose }: { setClose: Dispatch<boolean> }) => {
// const UpdateUser = () => {

//     const [openModal, setOpenModal] = useState(true);
//     const [errors, setErrors] = useState<{ email: null | string, phone: null | string }>({ email: null, phone: null });

//     const user = useSelector((state: RootState) => state.user.user);
//     console.log(user);
    
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const firstNameRef = useRef<HTMLInputElement>(null);
//     const lastNameRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);

//     const checkEmail = (): boolean => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailRef.current?.value) {
//             if (!emailRegex.test(emailRef.current.value)) {
//                 setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address." }));
//                 return false;
//             } else {
//                 setErrors(prevErrors => ({ ...prevErrors, email: null })); // מוחקת את הערך
//                 return true;
//             }
//         }
//         return true;
//     }

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         const valid = checkEmail();
//         if (!valid) {
//             alert("פרמטרים לא חוקיים");
//             return;
//         }

//         const userData: Partial<User> = {
//             firstName: firstNameRef.current?.value || user.firstName,
//             lastName: lastNameRef.current?.value || user.lastName,
//             email: emailRef.current?.value || user.email,
//             password: passwordRef.current?.value || user.password
//         }
//         dispatch(updateUser({ user: userData }))

//         setOpenModal(false);
//         navigate('/');
//     }

//     return (<>

//         <Modal /*open={true}*/ open={openModal} >
//             <Box sx={styleModal}>
//                 <IconButton onClick={() => setOpenModal(false)} sx={{ position: 'absolute', top: 13, right: 13 }}>
//                     <CloseIcon />
//                 </IconButton>
//                 <form onSubmit={handleSubmit} style={{ direction: "ltr" }}>
//                     <Typography variant="h5" sx={{ color: 'black', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
//                     <TextField label='firstName' defaultValue={user.firstName} variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
//                     <TextField label='lastName' defaultValue={user.lastName} variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
//                     <TextField label='email' defaultValue={user.email} variant="filled" margin="normal" fullWidth type="email" /*onChange={HandleChange}*/ inputRef={emailRef} />
//                     {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//                     <TextField label='password' defaultValue={user.password} variant="filled" margin="normal" fullWidth type="password" /*onChange={HandleChange}*/ inputRef={passwordRef} />

//                     <Button sx={{ backgroundColor: 'var(--primary-color)' }} variant="contained" fullWidth type="submit">Save Change</Button>
//                 </form>
//             </Box>
//         </Modal>
//     </>)
// }
// export default UpdateUser;


import { Box, Button, CircularProgress, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormEvent, useRef, useState } from "react";
import { styleModal } from "../../models/style";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { User } from "../../models/User";
import { updateUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router";

const UpdateUser = () => {
    const [openModal, setOpenModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email: null | string, phone: null | string }>({ email: null, phone: null });

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
        setLoading(true);
        setServerError(null);

        const valid = checkEmail();
        if (!valid) {
            alert("פרמטרים לא חוקיים");
            setLoading(false);
            return;
        }

        const userData: Partial<User> = {
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email,
            password: passwordRef.current?.value || user.password
        };

        try {
            const res = await dispatch(updateUser({ user: userData })).unwrap();
            console.log("in update Usr Comp ");
            console.log(res);           
            sessionStorage.setItem('userToken', res.token);
            console.log("after update User Comp");

            
            setOpenModal(false);
            navigate('/');
        } catch (err: any) {
            setServerError("אירעה שגיאה בעת העדכון. נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={openModal}>
            <Box sx={styleModal}>
                <IconButton onClick={() => setOpenModal(false)} sx={{ position: 'absolute', top: 13, right: 13 }}>
                    <CloseIcon />
                </IconButton>
                <form onSubmit={handleSubmit} style={{ direction: "ltr" }}>
                    <Typography variant="h5" sx={{ color: 'black', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                    <TextField label='firstName' defaultValue={user.firstName} variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
                    <TextField label='lastName' defaultValue={user.lastName} variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
                    <TextField label='email' defaultValue={user.email} variant="filled" margin="normal" fullWidth type="email" inputRef={emailRef} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <TextField label='password' defaultValue={user.password} variant="filled" margin="normal" fullWidth type="password" inputRef={passwordRef} />

                    {serverError && <Typography color="error" sx={{ mt: 1 }}>{serverError}</Typography>}

                    <Button
                        sx={{ backgroundColor: 'var(--primary-color)', mt: 2 }}
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Save Change"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default UpdateUser;
