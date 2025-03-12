import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useRef, useContext, useState, Dispatch } from "react"
import axios from "axios";
import { styleModal } from "./LoginRegisterWithApi";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";

const UpdateUser = ({ setClose }: { setClose: Dispatch<boolean> }) => {

    // const [user, userDispatch] = useContext(UserContext);
    const [errors, setErrors] = useState<{ email: null | string, phone: null | string }>({ email: null, phone: null });

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const checkEmail = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRef.current?.value) {
            if (!emailRegex.test(emailRef.current.value)) {
                setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email address." }));
                return false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: null })); // מוחקת את הערך
                return true;
            }
        }
        return true;
    }

    const checkPhone = (): boolean => {
        const phoneRegex = /^(?=.*\d{9})[0-9+\-\s()]*$/; // מאפשר רק מספרים, +, -, רווחים וסוגריים
        if (phoneRef.current?.value) {
            if (!phoneRegex.test(phoneRef.current.value)) {
                setErrors(prevErrors => ({ ...prevErrors, phone: "Invalid phone number." }));
                return false;
            }
            else {
                setErrors(prevErrors => ({ ...prevErrors, phone: null }));// אין שגיאה, מוחקת את הערך
                return true;
            }
        }
        return true;
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const valid = {
            email: checkEmail(),
            phone: checkPhone()
        };
        if (!valid.email || !valid.phone) {
            alert("פרמטרים לא חוקיים");
            return;
        }

        try {

            // await axios.put('http://localhost:3000/api/user', {
            //     firstName: firstNameRef.current?.value || user.firstName,
            //     lastName: lastNameRef.current?.value || user.lastName,
            //     email: emailRef.current?.value || user.email,
            //     address: addressRef.current?.value || user.address,
            //     phone: phoneRef.current?.value || user.phone
            // },
            //     { headers: { 'user-id': LoginStore.UserId + '' } }
            // );
            await axios.put('http://localhost:3000/api/user', {
                firstName: firstNameRef.current?.value ,
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value ,
                phone: phoneRef.current?.value 
            }
                // { headers: { 'user-id': LoginStore.UserId + '' } }
            );
            // userDispatch({
            //     type: 'UPDATE',
            //     data: {
            //         firstName: firstNameRef.current?.value || user.firstName,
            //         lastName: lastNameRef.current?.value || user.lastName,
            //         email: emailRef.current?.value || user.email,
            //         address: addressRef.current?.value || user.address,
            //         phone: phoneRef.current?.value || user.phone
            //     }
            // })
            // setClose(!close);
            setClose(false);
        } catch (e: any) {

            if (e.status == 404)
                alert("user don't found 😢");
        }
    }

    return (<>

        <Modal open={true} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: 'rosybrown', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                    <TextField label='firstName' variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
                    <TextField label='lastName' variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
                    <TextField label='email' /*defaultValue={user.email}*/ variant="filled" margin="normal" fullWidth type="email" /*onChange={HandleChange}*/ inputRef={emailRef} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <TextField label='address' variant="filled" margin="normal" fullWidth inputRef={addressRef} />
                    <TextField label='phone' variant="filled" margin="normal" fullWidth inputRef={phoneRef} />
                    {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

                    <Button sx={{ backgroundColor: 'rosybrown' }} variant="contained" fullWidth type="submit">Save Change</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default UpdateUser;


