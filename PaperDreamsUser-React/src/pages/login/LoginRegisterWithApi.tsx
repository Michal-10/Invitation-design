// import { Box, Button, Modal, IconButton, TextField, Typography } from "@mui/material"
// import { Dispatch, FormEvent, useRef, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import { styleModal } from "../../models/style";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/Store";
// import { User } from "../../models/User";
// import { loginRegister } from "../../redux/UserSlice";


// export default (({ status, setHideBtns, handleCloseModal }: { status: string, setHideBtns: Dispatch<boolean>, handleCloseModal: Dispatch<void> }) => {

//     const [openModal, setOpenModal] = useState(true);
//     const dispatch = useDispatch<AppDispatch>();
//     // const [, userDispatch] = useContext(UserContext);

//     const passwordRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const firstNameRef = useRef<HTMLInputElement>(null);
//     const lastNameRef = useRef<HTMLInputElement>(null);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const userData : Partial<User>= status == 'register' ? {
//                 firstName: firstNameRef.current?.value,
//                 lastName: lastNameRef.current?.value,
//                 email: emailRef.current?.value,
//                 password: passwordRef.current!.value,
//             } :
//                 {
//                     email: emailRef.current?.value,
//                     password: passwordRef.current!.value
//                 }


//            const res = await dispatch(loginRegister({ user: { ...userData }, status }));
//             sessionStorage.setItem('userToken', res.payload.token);
       
//             console.log("afetr login before session");

//             // sessionStorage.setItem('userToken', res.data);

//             setOpenModal(false);
//             setHideBtns(true);//מעבר לעמוד בית והסתרת הכפתורים

//             // navigate('/homePage');

//         } catch (e: any) {

//             if (e.status === 400 || e.status === 422 && status == 'register') {
//                 alert('user already sign up 🥲');
//             }
//             else if (e.status == 401 && status == 'login')
//                 alert('user is not register 🥲');
//             //handleCloseModal()
//             setHideBtns(false);
//             handleCloseModal(); // גם בשגיאה, לסגור את המודל
//         }
//     };

//     return (<>


//         <Modal open={openModal} >
//             <Box sx={styleModal}>
//                 <IconButton onClick={() => handleCloseModal()} sx={{ position: 'absolute', top: 13, right: 13 }}>
//                     <CloseIcon />
//                 </IconButton>
//                 <form onSubmit={handleSubmit} style={{ direction: "ltr" }}>
//                     <Typography variant="h5" sx={{ color: 'black', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status === 'login' ? "sign in" : "sign up"}</Typography>
//                     {status == 'login' ?
//                         <>
//                             <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
//                             <TextField label='Password' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
//                         </>
//                         :
//                         <>
//                             <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
//                             <TextField label='Password' variant="filled" margin="normal" type="password" fullWidth inputRef={passwordRef} required />
//                             <TextField label='FisrtName' variant="filled" margin="normal" type="text" fullWidth inputRef={firstNameRef} required />
//                             <TextField label='LastName' variant="filled" margin="normal" type="text" fullWidth inputRef={lastNameRef} required />
//                         </>
//                     }
//                     <Button sx={{ marginTop: '2px', backgroundColor: 'var(--primary-color)' }} fullWidth variant="contained" type="submit">התחברות</Button>
//                 </form>
//             </Box>
//         </Modal>
//     </>)
// })

// LoginRegisterWithApi.tsx

import { Box, Button, Modal, IconButton, TextField, Typography } from "@mui/material";
import { Dispatch, FormEvent, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { styleModal } from "../../models/style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { User } from "../../models/User";
import { googleLogin, loginRegister } from "../../redux/UserSlice";

export default function LoginRegisterWithApi({
  status,
  setHideBtns,
  handleCloseModal,
}: {
  status: string;
  setHideBtns: Dispatch<boolean>;
  handleCloseModal: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData: Partial<User> =
        status === "register"
          ? {
              firstName: firstNameRef.current?.value,
              lastName: lastNameRef.current?.value,
              email: emailRef.current?.value,
              password: passwordRef.current!.value,
            }
          : {
              email: emailRef.current?.value,
              password: passwordRef.current!.value,
            };

      const res = await dispatch(loginRegister({ user: { ...userData }, status }));
      console.log("after login before session");
      console.log(res);
      //  sessionStorage.setItem("userToken", res.payload.token);

      console.log("after login after session");
      console.log(sessionStorage.getItem("userToken"));
      console.log(res.payload.token);
      
      setHideBtns(true);
      handleCloseModal(); // סגירת מודל
    
    } catch (e: any) {
      if ((e.status === 400 || e.status === 422) && status === "register") {
        alert("user already signed up 🥲");
      } else if (e.status === 401 && status === "login") {
        alert("user is not registered 🥲");
      }

      setHideBtns(false);
      handleCloseModal(); // גם בשגיאה, לסגור את המודל
    }
  };





  const handleGoogleLogin = async () => {
    try {
      const res = await dispatch(googleLogin()); // ✅ קריאה ל־googleLogin
      console.log("Google login response", res);
      setHideBtns(true);
      handleCloseModal();
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed 🥲");
    }
  };







  return (
    <Modal open={true} onClose={handleCloseModal}>
      <Box sx={styleModal}>
        <IconButton onClick={handleCloseModal} sx={{ position: "absolute", top: 13, right: 13 }}>
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit} style={{ direction: "ltr" }}>
          <Typography
            variant="h5"
            sx={{ color: "black", margin: "20px", fontWeight: "bold", textAlign: "center" }}
          >
            {status === "login" ? "sign in" : "sign up"}
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            margin="normal"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <TextField
            label="Password"
            variant="filled"
            margin="normal"
            type="password"
            fullWidth
            inputRef={passwordRef}
            required
          />
          {status === "register" && (
            <>
              <TextField
                label="First Name"
                variant="filled"
                margin="normal"
                type="text"
                fullWidth
                inputRef={firstNameRef}
                required
              />
              <TextField
                label="Last Name"
                variant="filled"
                margin="normal"
                type="text"
                fullWidth
                inputRef={lastNameRef}
                required
              />
            </>
          )}
          <Button
            sx={{ marginTop: "2px", backgroundColor: "var(--primary-color)" }}
            fullWidth
            variant="contained"
            type="submit"
          >
            התחברות
          </Button>





          
          <Button
            sx={{ marginTop: "10px" }}
            fullWidth
            variant="outlined"
            type="button"
            onClick={handleGoogleLogin}
          >
            התחברות עם גוגל
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
