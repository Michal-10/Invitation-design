import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useRef, useState } from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { styleModal } from "../../models/style";
import { jwtType } from "../../models/JwtType";
import { UserId, UserToken } from "../../models/UserId";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";



// const UpdateUser = ({ setClose }: { setClose: Dispatch<boolean> }) => {
const UpdateUser = () => {

    const [openModal, setOpenModal] =useState(true);
    const [errors, setErrors] = useState<{ email: null | string, phone: null | string }>({ email: null, phone: null });

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
                setErrors(prevErrors => ({ ...prevErrors, email: null })); // מוחקת את הערך
                return true;
            }
        }
        return true;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const valid = checkEmail();
        if (!valid ) {
            alert("פרמטרים לא חוקיים");
            return;
        }

        try {
            //   ..צריך לחלץ אץ ה  id מהטוקן
        
            
            await axios.put(`http://localhost:5077/api/user/update-profile/${UserId}`, {
                FirstName: firstNameRef.current?.value ,
                LastName: lastNameRef.current?.value ,
                Email: emailRef.current?.value ,
                Password:passwordRef.current?.value 
            },
            { headers: {Authorization: `Bearer ${UserToken}`}}
            );

            // setClose(false);
            setOpenModal(false);

        } catch (e: any) {

            if (e.status == 404)
                alert("user don't found 😢");
        }
    }

    return (<>

        <Modal /*open={true}*/ open={openModal} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit} style={{direction:"ltr"}}>
                    <Typography variant="h5" sx={{ color: 'rosybrown', margin: '10px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                    <TextField label='firstName' variant="filled" margin="normal" fullWidth inputRef={firstNameRef} />
                    <TextField label='lastName' variant="filled" margin="normal" fullWidth inputRef={lastNameRef} />
                    <TextField label='email' /*defaultValue={user.email}*/ variant="filled" margin="normal" fullWidth type="email" /*onChange={HandleChange}*/ inputRef={emailRef} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <TextField label='password' variant="filled" margin="normal" fullWidth type="password" /*onChange={HandleChange}*/ inputRef={passwordRef} />

                    <Button sx={{ backgroundColor: 'rosybrown' }} variant="contained" fullWidth type="submit">Save Change</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default UpdateUser;


