

import { useState } from "react"
import { Button, CircularProgress, Box, Typography, Paper, Snackbar, Alert } from "@mui/material"
import { Download, CheckCircle } from "@mui/icons-material"
import { getDownloadURL } from "../../Services/FileService"

interface FileDownloadProps {
  fileName: string
  buttonText?: string
  showIcon?: boolean
  variant?: "text" | "outlined" | "contained"
  size?: "small" | "medium" | "large"
}

export default function FileDownload({
  fileName,
  buttonText = "הורד",
  showIcon = true,
  variant = "contained",
  size = "medium",
}: FileDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsDownloading(true)
    setProgress(0)
    setError(null)

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      // Get download URL
      const downloadUrl = await getDownloadURL(fileName)

      // Download the file
      const fileResponse = await fetch(downloadUrl)

      if (!fileResponse.ok) {
        throw new Error(`שגיאה בהורדת הקובץ: ${fileResponse.status}`)
      }

      const blob = await fileResponse.blob()

      // Create download link
      const link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Complete progress and show success
      clearInterval(progressInterval)
      setProgress(100)
      setShowSuccess(true)
    } catch (error) {
      console.error("❌ שגיאה בהורדה:", error)
      setError(error instanceof Error ? error.message : "שגיאה לא ידועה בהורדת הקובץ")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setShowSuccess(false)
    setError(null)
  }

  return (
    <Box>
      <Button
        onClick={handleDownload}
        variant={variant}
        size={size}
        startIcon={showIcon ? isDownloading ? <CircularProgress size={20} color="inherit" /> : <Download /> : undefined}
        disabled={isDownloading}
        color={variant === "contained" ? "primary" : undefined}
        sx={{
          borderRadius: "20px"
          ,
          "&:hover": {
            bgcolor: variant === "contained" ? "#primary" : undefined,
          }, "& .MuiButton-startIcon": {
            marginLeft: 1, // Add space between icon and text
          },
        }}
      >
        {isDownloading ? "מוריד..." : buttonText}
      </Button>

      {/* Progress indicator */}
      {isDownloading && progress > 0 && (
        <Paper
          elevation={0}
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "rgba(0,0,0,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <CircularProgress variant="determinate" value={progress} size={24} sx={{ color: "var(--primary-color)" }} />
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Paper>
      )}

      {/* Success/Error notifications */}
      <Snackbar
        open={showSuccess || !!error}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          variant="filled"
          icon={!error ? <CheckCircle /> : undefined}
        >
          {error || "הקובץ הורד בהצלחה!"}
        </Alert>
      </Snackbar>
    </Box>
  )
}



