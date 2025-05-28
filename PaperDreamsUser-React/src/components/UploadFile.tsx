import { Check, Upload, InsertDriveFile } from '@mui/icons-material'
import { Paper, Box, CircularProgress, Typography, Button } from '@mui/material'
import React, { Dispatch, useRef, useState } from 'react'

export default ({ onFileSelected }:{onFileSelected:Dispatch<File>}) => {
    const [file, setFile] = useState<File | null>(null)
    const [dragging, setDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        validateAndSetFile(e.target.files[0])
      }
    }
  
    const validateAndSetFile = (file: File) => {
      setError(null);

      const validTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type)) {
        setError("סוג הקובץ אינו נתמך. אנא העלה קובץ תמונה, PDF או מסמך Word.")
        return;
      }
  
      if (file.size > 10 * 1024 * 1024) {
        setError("הקובץ גדול מדי. גודל מקסימלי הוא 10MB.")
        return;
      }
  
      setUploading(true)
      setTimeout(() => {
        setFile(file);
        onFileSelected(file);
        setUploading(false);
      }, 1500)
    }
  
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
  
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
  
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
  
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        validateAndSetFile(e.dataTransfer.files[0]);
      }
    }
  
    const openFileDialog = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  
    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png,.pdf,.docx"
        />
  
        <Paper
          elevation={0}
          sx={{
            border: "2px dashed",
            borderColor: dragging ? "var(--primary-color)" : "grey.400",
            borderRadius: 2,
            bgcolor: dragging ? "rgba(255, 111, 97, 0.05)" : "grey.50",
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {uploading ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={50} sx={{ color: "var(--primary-color)", mb: 2 }} />
              <Typography>מעלה קובץ...</Typography>
            </Box>
          ) : file ? (
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Check fontSize="large" color="success"/>
                <Typography sx={{ mr: 1, fontWeight: "bold", color: "green" }}>הקובץ הועלה בהצלחה</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                }}
              >
                <InsertDriveFile fontSize="small" />
              </Box>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                  "&:hover": {
                    borderColor: "#e05e52",
                    bgcolor: "rgba(255, 111, 97, 0.05)",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  onFileSelected(null as unknown as File)
                }}
              >
                החלף קובץ
              </Button>
            </Box>
          ) : (
            <>
              <Upload sx={{ fontSize: 40, color: "#666" }} />
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                גרור ושחרר קובץ כאן
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                או לחץ לבחירת קובץ
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "var(--primary-color)",
                  "&:hover": {
                    bgcolor: "#e05e52",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  openFileDialog()
                }}
              >
                בחר קובץ
              </Button>
            </>
          )}
        </Paper>
  
        {error && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "error.light",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="error" sx={{ mr: 1 }}>⚠️</Typography>
            <Typography color="error" sx={{ mr: 1 }}>
              {error}
            </Typography>
          </Box>
        )}
      </>
    )
}
