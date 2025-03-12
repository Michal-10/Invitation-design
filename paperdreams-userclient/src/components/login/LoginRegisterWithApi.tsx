import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import ShowUserNameAndAvatar from "./UserDetails";
import { stat } from "fs";
// import { observer } from "mobx-react";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid rosybrown',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: 'rosybrown'
};

export default (({ status }: { status: string }) => {
    // export default observer(({ status }: { status: string }) => {

    const [openModal, setOpenModal] = useState(true);
    // const [, userDispatch] = useContext(UserContext);

    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            /**
             * register
             * public string FirstName { get; set; }
                public string LastName { get; set; }
                public string Email { get; set; }
                public string Password { get; set; }
                public string Role { get; set; }
                public DateTime UpdatedAt { get; set; }

             */

            /**
             * login
                    * 
                public string Email { get; set; }
                public string Password { get; set; }
             */
            if(status == 'login '){
            const res = await axios.post(`https://localhost:7158/api/user/${status}`, {
                FirstName : firstNameRef.current?.value,
                LastName :lastNameRef.current?.value,
                Email :emailRef.current?.value,
                Password: passwordRef.current!.value,
                Role :'user',
                UpdatedAt: new Date()
            });
        }
        else {
            const res = await axios.post(`https://localhost:7158/api/user/${status}`, {
                Email :emailRef.current?.value,
                Password: passwordRef.current!.value
            });
        }

            // if (status == 'login')
            //     LoginStore.UserId = res.data.user.id;
            // else
            //     LoginStore.UserId = res.data.userId;

            // userDispatch({
            //     type: "CREATE",
            //     data: {
            //         password: passwordRef.current?.value || "",
            //         email: emailRef.current?.value || "",
            //         lastName: status == 'login' ? res.data.user.lastName : '',
            //         firstName: status == 'login' ? res.data.user.firstName : '',
            //         address: status == 'login' ? res.data.user.address : '',
            //         phone: status == 'login' ? res.data.user.phone : '',
            //     },
            // });

            setOpenModal(!openModal);
            // LoginStore.IsLogged = 'after';

        } catch (e: any) {

            if (e.status === 400 || e.status === 422 && status == 'register') {
                alert('user already sign up 🥲');
            }
            else if (e.status == 401 && status == 'login')
                alert('user is not register 🥲');
            // LoginStore.IsLogged = 'before';
        }
    };

    return (<>

        <Modal open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: 'rosybrown', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status === 'login' ? "sign in" : "sign up"}</Typography>
                    {status == 'login' ?
                        <>   
                            <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                            <TextField label='Password' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
                        </>:
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

        {!openModal && <ShowUserNameAndAvatar />}
    </>)
})

