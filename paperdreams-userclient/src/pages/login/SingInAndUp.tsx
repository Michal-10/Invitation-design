import { Box, Grid2, Button } from "@mui/material";
import { useState } from "react";
import LoginRegisterWithApi from "./LoginRegisterWithApi";
import { HomePage } from "../../components/HomePage";
import { topStyle } from "../../models/style";




export const SingInAndUp = ()=> {
    // export default observer(() => {

    const [signInOrUp, setSignInOrUp] = useState<'login' | 'register' | null>(null);
    const [hideBtns, setHideBtns] = useState<boolean>(false);

    const HandleClick = (signInUp: 'login' | 'register') => {
        setSignInOrUp(signInUp);
        // LoginStore.IsLogged = 'in';
    }

    const handleCloseModal = () => {
        setSignInOrUp(null);
    };

    return (<>


        {/* {IsLoggedStore.IsLogged === 'before' ? */}
        {!hideBtns ?
            <>
                <Box sx={topStyle}>
                    <Grid2 container>
                        <Box sx={{ display: 'flex', marginTop: '4vh', marginRight: '20px' }}>
                            <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '50px' }} variant="outlined" onClick={() => HandleClick('login')}>sign in</Button>
                            <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '30px' }} variant="outlined" onClick={() => HandleClick('register')}>sign up</Button>
                        </Box>
                    </Grid2>
                </Box >
            </>
            :
            <HomePage/>
        }

        {/* : */}
        {signInOrUp && <LoginRegisterWithApi status={signInOrUp!} setHideBtns={setHideBtns} handleCloseModal={handleCloseModal} />}
        {/* } */}
    </>)
}

