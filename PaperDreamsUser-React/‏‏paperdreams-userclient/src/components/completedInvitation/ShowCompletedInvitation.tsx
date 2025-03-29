


import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography, Fade } from "@mui/material";
import { CalendarToday } from "@mui/icons-material"; // Example: Adjust based on your icon library
import { getDownloadURL } from "../Services/FileService";
import FileDownload from "../FileDownload";
import { useEffect, useState } from "react";

export default function ShowCompletedInvitation({ fileName, time }: { fileName: string,time: Date }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setLoading(true)
        const url = await getDownloadURL(fileName)
        setImageUrl(url)
      } catch (error) {
        console.error("Error fetching image URL:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFileUrl()
  }, [fileName])

  return (
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          width: 350,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 250,
              bgcolor: "#f8f9fa",
            }}
          >
            <CircularProgress size={50} sx={{ color: "var(--primary-color)" }} />
          </Box>
        ) : (
          <>
            <CardMedia
              component="img"
              height={250}
              image={imageUrl || "/placeholder.svg?height=250&width=350"}
              alt={fileName}
              sx={{
                objectFit: "contain",
                bgcolor: "white",
                p: 2,
              }}
            />
            <CardContent sx={{ pb: 1, direction: "rtl" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {fileName.split(".")[0]}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary", mb: 1 }}>
                <CalendarToday fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {/* תאריך יצירה  */}
                  {/* {time.toLocaleDateString('he-IL')} */}
                  {/* {format(time, 'yyyy-MM-dd')}  */}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-start", p: 2, pt: 0 }}>
              <FileDownload fileName={fileName} />
            </CardActions>
          </>
        )}
      </Card>
    </Fade>
  )
}

