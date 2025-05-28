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
