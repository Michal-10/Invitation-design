import { Box, Button, Modal, IconButton, TextField, Typography } from "@mui/material"
import { Dispatch, FormEvent, useRef, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { styleModal } from "../../models/style";
import { useNavigate } from "react-router";


// import { observer } from "mobx-react";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";



export default (({ status, setHideBtns, handleCloseModal }: { status: string, setHideBtns: Dispatch<boolean>, handleCloseModal: Dispatch<void> }) => {
    // export default (( status:string, setHideBtns:Dispatch<boolean> ) => {
    // export default observer(({ status }: { status: string }) => {

    const [openModal, setOpenModal] = useState(true);
    // const [, userDispatch] = useContext(UserContext);

    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            let res = null;
            if (status == 'register') {
                console.log("register****");
                res = await axios.post('http://localhost:5077/api/user/register', {
                    FirstName: firstNameRef.current?.value,
                    LastName: lastNameRef.current?.value,
                    Email: emailRef.current?.value,
                    Password: passwordRef.current!.value,
                    Role: 'user',
                    UpdatedAt: new Date()
                });
            }
            else {
                console.log("login****");
                res = await axios.post('http://localhost:5077/api/user/login', {
                    Email: emailRef.current?.value,
                    Password: passwordRef.current!.value
                });
            }
            sessionStorage.setItem('userToken', res.data);

            setOpenModal(false);
            setHideBtns(true);//מעבר לעמוד בית והסתרת הכפתורים

            navigate('/homePage');

        } catch (e: any) {

            if (e.status === 400 || e.status === 422 && status == 'register') {
                alert('user already sign up 🥲');
            }
            else if (e.status == 401 && status == 'login')
                alert('user is not register 🥲');
            handleCloseModal()
        }
    };

    return (<>


        <Modal open={openModal} >
            <Box sx={styleModal}>
                <IconButton onClick={()=>handleCloseModal()} sx={{ position: 'absolute', top: 13, right: 13 }}>
                    <CloseIcon />
                </IconButton>
                <form onSubmit={handleSubmit} style={{direction:"ltr"}}>
                    <Typography variant="h5" sx={{ color: 'rosybrown', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status === 'login' ? "sign in" : "sign up"}</Typography>
                    {status == 'login' ?
                        <>
                            <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                            <TextField label='Password' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
                        </>
                        :
                        <>
                            <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                            <TextField label='Password' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
                            <TextField label='FisrtName' variant="filled" margin="normal" type="text" fullWidth inputRef={firstNameRef} required />
                            <TextField label='LastName' variant="filled" margin="normal" type="text" fullWidth inputRef={lastNameRef} required />
                        </>
                    }
                    <Button sx={{ marginTop: '2px', backgroundColor: 'rosybrown' }} fullWidth variant="contained" type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal>

        {/* {!openModal && <UserDetails />} */}
        {/* {!openModal && <HomePage />} */}
    </>)
})

