// import { useState } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";
// import { UserId, UserToken } from "../models/UserId";
// import { jwtDecode } from "jwt-decode";
// import { jwtType } from "../models/JwtType";

// export default () => {

//     const [file, setFile] = useState<File | null>(null);
//     const [paragraphs, setParagraphs] = useState<string[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [droppedText, setDroppedText] = useState<string[]>([]);
//     // const [progress, setProgress] = useState(0);

//     // פונקציה להעלאת קובץ לשרת כדי לקבל את ה-Pre-signed URL
//     const getPresignedUrl = async (fileName: string): Promise<string> => {
//         try {
//             const response = await axios.get(`http://localhost:5077/api/upload/presigned-url`, {
//                 params: { fileName },
//             });
//             console.log(response.data.url);

//             return response.data.url;
//         } catch (error) {
//             console.error("Error getting presigned URL:", error);
//             throw new Error("Failed to get presigned URL.");
//         }
//     };

//     // פונקציה להעלאת קובץ ל-S3
//     const uploadToS3 = async (file: File, presignedUrl: string): Promise<void> => {
//         try {
//             // שולחים את הקובץ ל-S3 באמצעות ה-Pre-signed URL
//             const res = await axios.put(presignedUrl, file, {
//                 headers: {
//                     "Content-Type": file.type,
//                 }
//                 // ,
//                 // onUploadProgress: (progressEvent) => {
//                 //     const percent = Math.round(
//                 //         (progressEvent.loaded * 100) / (progressEvent.total || 1)
//                 //     );
//                 //     setProgress(percent);
//                 // },
//             });

//             alert('הקובץ הועלה בהצלחה!');

//         } catch (error) {
//             console.error("Error uploading file to S3:", error);
//             throw new Error("Failed to upload file to S3.");
//         }
//     };

//     // פונקציה להעלאת התמונה
//     const uploadImage = async () => {
//         if (!file) return;

//         setLoading(true);
//         try {
//             // שלב 1: קבלת ה-Pre-signed URL
//             const presignedUrl = await getPresignedUrl(file.name);

//             // שלב 2: העלאת הקובץ ל-S3 באמצעות ה-Pre-signed URL
//             await uploadToS3(file, presignedUrl);

//             console.log("--------------before api/TextUpload/upload --------------- ");
//             let userId :number;;
//             // =UserId;
//             // if(!userId){
//             //     alert("user is not register");
//             //     return;
//             // }
//             const token = UserToken;
//             if(token){
//                 userId = jwtDecode<jwtType>(token).userId ;
//                 if (!userId){
//                     console.log("userId is null");
//                     return;
//                 }
//             }
//             else {
//                 alert("user is not register");
//                 return;
//             }

//             if(userId)
//             await axios.post('http://localhost:5077/api/TextUpload/upload', {
//                     UserId: userId,
//                     File:presignedUrl
//                 },
//                 { headers: 
//                     { Authorization: `Bearer ${UserToken}`}
//                 }
//             )

//             console.log("after upload Text to local");
            
//             console.log("File successfully uploaded to S3.");
//             // extractText(presignedUrl); // קריאה לפונקציה extractText עם ה-URL החדש (אם צריך לשלוח אותו לגילוי טקסט)
//             // console.log(extractText(presignedUrl));

//         } catch (error) {
//             console.error("Error uploading image:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // פונקציה לחילוץ טקסט מהתמונה
//     // const extractText = async (imageUrl: string) => {
//     //     try {
//     //         const response = await axios.post("http://localhost:5077/api/extract-text", { url: imageUrl });
//     //         setParagraphs(response.data.paragraphs); // עדכון הפסקאות שהתקבלו
//     //     } catch (error) {
//     //         console.error("Error extracting text:", error);
//     //     }
//     // };

//     // פונקציה לגרירת טקסט
//     // const handleDragStart = (event: React.DragEvent<HTMLParagraphElement>, text: string) => {
//     //     event.dataTransfer.setData("text/plain", text);
//     // };

//     // // פונקציה להורדת טקסט
//     // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     //     event.preventDefault();
//     //     const text = event.dataTransfer.getData("text/plain");
//     //     setDroppedText([...droppedText, text]);
//     // };

//     // // פונקציה לטיפול בשינוי הקובץ
//     // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     setFile(event.target.files?.[0] || null);
//     // };

//     return (
//         <div className="flex flex-row gap-4 p-4">
//             {/* צד ימין - פסקאות ניתנות לגרירה */}
//             <div className="w-1/3 border p-2 bg-gray-100">
//                 <h3 className="font-bold">פסקאות שהופקו:</h3>
//                 {paragraphs.map((para, index) => (
//                     <p
//                         key={index}
//                         className="p-2 border rounded bg-white cursor-pointer"
//                         draggable
//                         // onDragStart={(event) => handleDragStart(event, para)}
//                     >
//                         {para}
//                     </p>
//                 ))}
//             </div>

//             {/* צד שמאל - העלאת תמונה והזמנה עם Drop Zone */}
//             <div className="w-2/3 flex flex-col items-center">
//                 <input type="file" onChange={handleFileChange} className="mb-4" />
//                 <Button
//                     onClick={uploadImage}
//                     className="bg-blue-500 text-white p-2 rounded"
//                     disabled={loading}
//                 >
//                     {loading ? "Uploading..." : "Upload Image"}
//                 </Button>
//                 {/* {progress > 0 && <div>התקדמות: {progress}%</div>} */}
//                 <div
//                     className="relative w-full h-96 border mt-4 flex items-center justify-center bg-gray-200"
//                     onDrop={handleDrop}
//                     onDragOver={(event) => event.preventDefault()}
//                 >
//                     <h3 className="absolute top-2 text-lg font-bold">גרור לכאן את הפסקאות</h3>
//                     {droppedText.map((text, index) => (
//                         <p key={index} className="absolute text-lg font-semibold bg-white p-1 rounded shadow">
//                             {text}
//                         </p>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };


import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

export default () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // פונקציה לקבלת Pre-signed URL מהשרת
    const getPresignedUrl = async (fileName: string): Promise<string> => {
        try {
            const response = await axios.get(`http://localhost:5077/api/upload/presigned-url`, {
                params: { fileName },
            });
            return response.data.url;
        } catch (error) {
            console.error("Error getting presigned URL:", error);
            throw new Error("Failed to get presigned URL.");
        }
    };

    // פונקציה להעלאת הקובץ ל-S3
    const uploadToS3 = async (file: File, presignedUrl: string): Promise<void> => {
        try {
            await axios.put(presignedUrl, file, {
                headers: { "Content-Type": file.type },
            });
            alert('הקובץ הועלה בהצלחה ל-S3!');
        } catch (error) {
            console.error("Error uploading file to S3:", error);
            throw new Error("Failed to upload file to S3.");
        }
    };

    // פונקציה להעלאת תמונה
    const uploadImage = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const presignedUrl = await getPresignedUrl(file.name);
            await uploadToS3(file, presignedUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4" />
            <Button onClick={uploadImage} disabled={loading} variant="contained" color="primary">
                {loading ? "מעלה..." : "העלה תמונה"}
            </Button>
        </div>
    );
};
