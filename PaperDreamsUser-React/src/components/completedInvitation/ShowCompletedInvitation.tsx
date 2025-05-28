import { Box, Card, CardActions, CardContent, CardMedia, Checkbox, Typography, CircularProgress } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import FileDownload from "./FileDownload";
import { useEffect, useState } from "react";
import { getDownloadURL } from "../../Services/FileService";
import SendEmail from "./SendEmail";

interface Props {
  fileName: string;
  time: Date;
  isSelected: boolean;
  onToggleSelect: (fileName: string) => void;
}

export default function ShowCompletedInvitation({ fileName, time, isSelected, onToggleSelect }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        setLoading(true);
        const url = await getDownloadURL(fileName);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, [fileName]);

  return (
    <Card sx={{ width: 350, borderRadius: 4, position: "relative" }}>
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(fileName)}
        sx={{ position: "absolute", top: 7, left: 7, zIndex: 2 }}
        color="primary"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CardMedia
            component="img"
            height={250}
            image={imageUrl || "/placeholder.svg"}
            alt={fileName}
            sx={{ objectFit: "contain", bgcolor: "white", p: 2 }}
          />
          <CardContent sx={{ direction: "rtl" }}>
            <Box display="flex" alignItems="center" color="text.secondary">
              <CalendarToday fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {" תאריך יצירה " + new Date(time).toLocaleDateString("he-IL")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
            <FileDownload fileName={fileName} />
            <SendEmail fileName={fileName} imageUrl={imageUrl} />
          </CardActions>
        </>
      )}
    </Card>
  );
}
