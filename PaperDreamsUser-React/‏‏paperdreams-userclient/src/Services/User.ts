import { jwtDecode } from "jwt-decode";
import { jwtType } from "../../models/JwtType";

export const UserToken = sessionStorage.getItem("userToken");


export const UserId = (() => {
    const token = UserToken;

    if (token) {
        try {
            const decoded = jwtDecode<jwtType>(token);
            console.log("token");
            
            console.log(token);
            console.log("userId");
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
