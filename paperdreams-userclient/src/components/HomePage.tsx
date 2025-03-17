import { Button } from "@mui/material";
import UserDetails from "../pages/login/UserDetails";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router";

export const HomePage = () => {

    const navigate = useNavigate()
    return (
        <>
            <div>HomePage</div>
            <UserDetails />
            <hr />
            <UploadImage/>
            <hr />
            <Button onClick={()=>{navigate('/showTemplates')}}>Show Templates</Button>
            {/* <TemplatesPage/> */}
            
        </>
    )
}