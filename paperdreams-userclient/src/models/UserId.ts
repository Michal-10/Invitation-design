import { jwtDecode } from "jwt-decode";
import { jwtType } from "./JwtType";

export const UserToken = sessionStorage.getItem("userToken");


export const UserId = (() => {
    const token = UserToken;

    if (token) {
        try {
            const decoded = jwtDecode<jwtType>(token);
            return decoded.userId;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
})();
