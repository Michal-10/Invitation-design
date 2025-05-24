import { useState } from "react";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { Download, CheckCircle } from "@mui/icons-material";
import JSZip from "jszip";
import { getDownloadURL } from "../../Services/FileService";
import saveAs from "file-saver";

interface MultiFileDownloadProps {
  selectedFiles: string[];
  onClearSelection: () => void;
}

export default function MultiFileDownload({ selectedFiles, onClearSelection }: MultiFileDownloadProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const zip = new JSZip();

      for (const fileName of selectedFiles) {
        const url = await getDownloadURL(fileName);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`בעיה בהורדת הקובץ: ${fileName}`);
        const blob = await response.blob();
        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "ההזמנות_שלי.zip");
      setSuccess(true);
      onClearSelection();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Box display="flex" alignItems="center" gap={2} mt={2} >
        <Box display="flex" alignItems="center" gap={2} mt={2} >

      <Button
        variant="contained"
        disabled={selectedFiles.length === 0 || loading}
        onClick={handleDownloadAll}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Download />}
        sx={{ borderRadius: 3 }}
      >
        {loading ? "מוריד..." : `הורד (${selectedFiles.length}) קבצים`}
      </Button>
      {selectedFiles.length > 0 && (
        <Button onClick={onClearSelection} color="primary" variant="outlined" sx={{ borderRadius: 3 }}>
          <CheckCircle />
          נקה בחירה
        </Button>
      )}
      <Snackbar
        open={success || !!error}
        autoHideDuration={4000}
        onClose={() => {
          setSuccess(false);
          setError(null);
        }}
      >
        <Alert severity={error ? "error" : "success"} icon={!error ? <CheckCircle /> : undefined} variant="filled">
          {error || "ההזמנות הורדו בהצלחה!"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
