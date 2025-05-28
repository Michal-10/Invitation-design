import axios from "axios";


const uploadToS3 = async (file: File, presignedUrl: string) => {
    try {
        await axios.put(presignedUrl, file, {
            headers: { "Content-Type": file.type },
        });
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error("Failed to upload file to S3.");
    }
};

export const uploadFileToAWS = async (file: File) => {

    if (!file) return;

    try {
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/upload/presigned-url?fileName=${file.name}`);
        await uploadToS3(file, res.data);
        return res.data;

    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

