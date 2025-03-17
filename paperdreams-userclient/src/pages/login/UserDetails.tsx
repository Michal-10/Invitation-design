import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import { topStyle } from "../../models/style";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";

const UserDetails = () => {

    const [update, setUpdate] = useState(false);
    // const [user,] = useContext(UserContext);

    // function stringToColor(string: string) {
    //     let hash = 0;
    //     let i;
    //     for (i = 0; i < string.length; i += 1) {
    //         hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //     }
    //     let color = '#';

    //     for (i = 0; i < 3; i += 1) {
    //         const value = (hash >> (i * 8)) & 0xff;
    //         color += `00${value.toString(16)}`.slice(-2);
    //     }
    //     return color;
    // }

    // const stringAvatar = (name: string) => {

    //     if (name != "" && name != undefined) {
    //         return {
    //             sx: {
    //                 bgcolor: stringToColor(name),
    //             },
    //             children: `${name.split(' ')[0][0]}`
    //         }
    //     };
    // }

    return (
        <>
            {/* <Box  sx={{ display: 'flex', marginTop: '4vh', marginRight: '20px'  }}> */}
            {/* <Stack direction="row" spacing={2}> */}
            {/* <Avatar {...stringAvatar(user.firstName)} >
                        {(user.firstName ? user.firstName[0] : '')}
                    </Avatar> */}
            {/* <Box sx={{ fontWeight: 'bolder', whiteSpace: 'nowrap', fontSize: '20px' }}>  {user.firstName} {user.lastName}</Box> */}
            {/* <Button style={{ color: 'rosybrown' }} sx={{ marginRight: '10px', padding: '10px', borderRadius: '3px', border: '2px solid rosybrown' }} variant="outlined" onClick={() => setUpdate(!update)}>Update</Button> */}
            {/* <Button style={{ color: 'rosybrown' }} sx={{ marginRight: '10px', padding: '10px', borderRadius: '3px', border: '2px solid rosybrown' }} variant="outlined"  */}
            {/* /*onClick={() => LoginStore.IsLogged = 'before'}*/}
            {/* >logout</Button> */}
            {/* </Stack> */}
            {/* </Box> */}
            <Box sx={topStyle}>
                <Grid2 container>
                    <Box sx={{ display: 'flex', marginTop: '4vh', marginRight: '20px' }}>
                        <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '30px' }} variant="outlined" onClick={() => setUpdate(!update)}>Update</Button>
                        <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} sx={{ marginLeft: '35px' }} variant="outlined" /*onClick={() => LoginStore.IsLogged = 'before'}*/>logout</Button>
                    </Box>
                </Grid2>
            </Box>

            {/* {update && <UpdateUser setClose={setUpdate} />} */}
            {update && <UpdateUser />}
        </>
    )
}
export default UserDetails;

