
import axios from "axios";

export const getDownloadURL = async (fileName: string) => {
    try {
        console.log("in getDownloadURL");
        console.log(fileName);
        
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/upload/download-url/${fileName}`);
        return res.data;
    } catch (error) {
        console.error('שגיאה בהבאת ה-URL:', error);
        alert(`שגיאה בהבאת ה-URL: ${error}`);
    }
};

export const getText = async (file: File) => {
    const eventType = JSON.parse(sessionStorage.getItem("category") || '').name;

    if (!eventType) {
        throw new Error("סוג האירוע לא נמצא ב-sessionStorage");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("event_type", eventType);

    console.log("in getText bsfore ");

    try {
        const response = await fetch(`https://invitationline-aiserver.onrender.com/upload/`, {
            method: "POST",
            body: formData,
        });
        console.log("in getText after ");
        console.log(response);



        if (!response.ok) {
            throw new Error("שגיאה בעת שליחת הקובץ לשרת");
        }

        return await response.json();
    } catch (error) {
        console.error("שגיאה:", error);
        return null;
    }
};
