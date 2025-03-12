import { Avatar, Box, Button, Stack } from "@mui/material";
import { useContext, useState } from "react";
import UpdateUser from "./UpdateUser";
// import LoginStore from "../global-state/mobX/LoginStore";
// import { UserContext } from "../UserContextReducer";

const ShowUserNameAndAvatar = () => {

    const [update, setUpdate] = useState(false);
    // const [user,] = useContext(UserContext);

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    const stringAvatar = (name: string) => {

        if (name != "" && name != undefined) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name.split(' ')[0][0]}`
            }
        };
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: "6vh" }}>
                <Stack direction="row" spacing={2}>
                    {/* <Avatar {...stringAvatar(user.firstName)} >
                        {(user.firstName ? user.firstName[0] : '')}
                    </Avatar> */}
                    {/* <Box sx={{ fontWeight: 'bolder', whiteSpace: 'nowrap', fontSize: '20px' }}>  {user.firstName} {user.lastName}</Box> */}
                    <Button style={{ color: 'rosybrown' }} sx={{ marginRight: '10px', padding: '10px', borderRadius: '3px', border: '2px solid rosybrown' }} variant="outlined" onClick={() => setUpdate(!update)}>Update</Button>
                    <Button style={{ color: 'rosybrown' }} sx={{ marginRight: '10px', padding: '10px', borderRadius: '3px', border: '2px solid rosybrown' }} variant="outlined" /*onClick={() => LoginStore.IsLogged = 'before'}*/>logout</Button>
                </Stack>
            </Box>

            {update && <UpdateUser setClose={setUpdate} />}
        </>
    )
}
export default ShowUserNameAndAvatar;

