import { jwtDecode } from "jwt-decode";
import { jwtType } from "../models/JwtType";



export const UserId = (() => {
    
    const token = sessionStorage.getItem("userToken");;
    console.log(token);
    console.log("UserToken");
    console.log(token);
    console.log(";;;;;;;;;;;;;;;;;;;;;");
    
    

    if (token) {
        try {
            const decoded = jwtDecode<jwtType>(token);
            console.log("token");
            
            console.log(token);
            console.log("userId");
            console.log(decoded);
            console.log(";;;;;;;;;;;;;;;;;;;;;");
            
            
            const userId = decoded.userId;
            console.log(userId);
            
            return decoded.userId;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
})();
