import { Box, Grid2, Button } from "@mui/material";
import { useState } from "react";
import LoginRegisterWithApi from "./LoginRegisterWithApi";




export default ()=> {
    // export default observer(() => {

    const [signInOrUp, setSignInOrUp] = useState<'login' | 'register' | null>(null);
    const [hideBtns, setHideBtns] = useState<boolean>(false);

    const handleCloseModal = () => {
        setSignInOrUp(null);
    };

    return (
        <>           
             <Box sx={{top:'20px' }}>
                <Grid2 container>
                    <Box sx={{ display: 'flex', justifyContent:'center', marginRight: '40px' }}>
                        <Button color="inherit" sx={{ marginLeft: '50px', fontWeight:500, border:'2px solid var(--primary-color)' ,paddingLeft:'9px',paddingRight:'9px',
                        '&:hover': {
                            color: 'black',
                        }}}
                        onClick={() => setSignInOrUp('register')}>sign up</Button>
                        <Button color="inherit" sx={{ marginLeft: '30px', fontWeight:500, border:'2px solid var(--primary-color)',paddingLeft:'13px',paddingRight:'13px', 
                        '&:hover': { 
                            color: 'black', 
                        }}}  onClick={() => setSignInOrUp('login')}>sign in</Button>
                    </Box>
                </Grid2>
            </Box >
            {signInOrUp && <LoginRegisterWithApi status={signInOrUp!} setHideBtns={setHideBtns} handleCloseModal={handleCloseModal} />}
        </>
    )
}

