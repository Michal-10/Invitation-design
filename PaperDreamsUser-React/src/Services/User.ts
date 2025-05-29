import { jwtDecode } from "jwt-decode";
import { jwtType } from "../models/JwtType";


export const decodeToken = () => {
    
    const token = sessionStorage.getItem("userToken");

    if (token) {
        try {
            const decoded = jwtDecode<jwtType>(token);
            return {decoded};
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
};
