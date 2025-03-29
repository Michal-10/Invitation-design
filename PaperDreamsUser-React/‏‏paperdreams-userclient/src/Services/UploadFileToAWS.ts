import axios from "axios";


const uploadToS3 = async (file: File, presignedUrl: string) => {
    try {

        console.log("uploadToS3");
        console.log(presignedUrl);
        console.log(file);

        await axios.put(presignedUrl, file, {
            headers: { "Content-Type": file.type },
        });

        alert("הקובץ הועלה בהצלחה ל-S3!");

    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error("Failed to upload file to S3.");
    }
};


export const uploadFileToAWS = async (file: File) => {

    if (!file) return;

    try {
        const res = await axios.get(`http://localhost:5077/api/upload/presigned-url?fileName=${file.name}`);
        console.log(res);
        console.log(file);

        await uploadToS3(file, res.data);

        console.log("הקובץ הועלה בהצלחה ל-S3!");

        console.log("--------------before api/TextUpload/upload --------------- ");
        return res.data;//return presigned-url

    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

