
// import { CircleRounded } from "@mui/icons-material";
// import { Card, CardMedia, Typography } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default ({ fileName }: { fileName: string }) => {

//     const [imageUrl, setImageUrl] = useState<string | null>(null);

//     useEffect(() => {

//         console.log("-----------------------------");
//         console.log("inshoeTemplte useEffect 1");
//         console.log("-----------------------------");

//         const fetchFileUrl = async () => {
//             try {
//                 console.log("fileName");
//                 console.log(fileName);

//                 //לקבלת ה-Presigned URL
//                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/upload/download-url/${fileName}`);

//                 setImageUrl(res.data); // הגדרת ה-URL לקבלת התמונה

//             } catch (error) {
//                 console.error('שגיאה בהבאת ה-URL:', error);
//                 alert(`שגיאה בהבאת ה-URL: ${error}`);
//             }
//         };

//         fetchFileUrl();
//     }, [fileName]); // מבצע את הקריאה כל פעם ששם הקובץ משתנה


//     return (
//         <div>
//             <Card sx={{ width: 'auto', boxShadow: 4, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
//                 {imageUrl ? (
//                     <>
//                         <CardMedia
//                             component="img"
//                             height="170"
//                             image={imageUrl}
//                             alt={fileName}
//                             sx={{width:'80%', objectFit: 'contain',padding:'15px', paddingTop: '15px' }}
//                         />
//                     </>
//                 ) : (
//                     <Typography variant="body1" align="center" sx={{ padding: 2 }}>
//                         <CircleRounded />
//                     </Typography>
//                 )}
//             </Card>
//         </div>
//     );
// };



import { Card, CardMedia, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShowTemplate({ fileName }: { fileName: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/upload/download-url/${fileName}`
        );
        setImageUrl(res.data);
      } catch (error) {
        console.error("שגיאה בהבאת ה-URL:", error);
        alert(`שגיאה בהבאת ה-URL: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, [fileName]);

  return (
    <Box>
      <Card
        sx={{
          width: "auto",
          height: 200,
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fff",
        }}
      >
        {loading ? (
          <CircularProgress size={40} sx={{ color: "primary.main" }} />
        ) : (
          <CardMedia
            component="img"
            height="170"
            image={imageUrl || ""}
            alt={fileName}
            sx={{
              width: "80%",
              objectFit: "contain",
              p: 2,
            }}
          />
        )}
      </Card>
    </Box>
  );
}
