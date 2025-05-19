import React, { useState } from "react"
import { fabric } from "fabric"
import { TemplateField } from "../../models/TemplateField"
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
  Tooltip,
  useTheme,
} from "@mui/material"
import {
  FormatBold,
  ArrowUpward,
  ArrowBack,
  ArrowForward,
  ArrowDownward,
  Close,
  Edit,
  ColorLens,
  FormatSize,
  TextFields,
} from "@mui/icons-material"

export default function TextEditorSidebar({
  canvas,
  fieldsWithPlaces,
}: {
  canvas: fabric.Canvas
  fieldsWithPlaces: TemplateField[]
}) {
  const theme = useTheme()

  const [selectedField, setSelectedField] = useState<TemplateField | null>(null)
  const [textValue, setTextValue] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(30)
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [textColor, setTextColor] = useState<string>("#000000")
  const [bgColor, setBgColor] = useState<string>("transparent")
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleFieldSelect = (templateField: TemplateField) => {
    setSelectedField(templateField)
    setTextValue(templateField.field.name)
    setIsEditing(true)

    if (canvas) {
      const textObj = canvas
        .getObjects()
        .find((obj) => obj.left === templateField.x && obj.top === templateField.y) as fabric.Text

      if (textObj) {
        setFontSize(textObj.fontSize || 30)
        setFontFamily(textObj.fontFamily || "Arial")
        setTextColor(textObj.fill as string)
        setBgColor(textObj.backgroundColor || "transparent")
        setIsBold(textObj.fontWeight === "bold")
      }
    }
  }

  const handleExitEditing = () => {
    setIsEditing(false)
    setSelectedField(null)
  }

  const updateTextProperties = (updates: Partial<fabric.Text>) => {
    if (!canvas || !selectedField) return

    const textObj = canvas
      .getObjects()
      .find((obj) => obj.left === selectedField.x && obj.top === selectedField.y) as fabric.Text

    if (textObj) {
      textObj.set(updates)
      canvas.renderAll()
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
    updateTextProperties({ text: e.target.value })
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value)
    setFontSize(newSize)
    updateTextProperties({ fontSize: newSize })
  }

  const handleFontFamilyChange = (e: SelectChangeEvent<string>) => {
    setFontFamily(e.target.value)
    updateTextProperties({ fontFamily: e.target.value })
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value)
    updateTextProperties({ fill: e.target.value })
  }

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value)
    updateTextProperties({ backgroundColor: e.target.value })
  }

  const toggleBold = () => {
    setIsBold(!isBold)
    updateTextProperties({ fontWeight: isBold ? "normal" : "bold" })
  }

  const moveText = (dx: number, dy: number) => {
    if (!canvas || !selectedField) return

    const textObj = canvas
      .getObjects()
      .find((obj) => obj.left === selectedField.x && obj.top === selectedField.y) as fabric.Text

    if (textObj) {
      textObj.set({
        left: (textObj.left || 0) + dx,
        top: (textObj.top || 0) + dy,
      })
      setSelectedField({ ...selectedField, x: textObj.left || 0, y: textObj.top || 0 })
      canvas.renderAll()
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        direction: "ltr",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Edit />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          עורך טקסטים
        </Typography>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
        {!isEditing ? (
          <>
            <Typography variant="body1" sx={{ mb: 1, color: "#666", textAlign: "center" }}>
              בחר שדה טקסט לעריכה:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {fieldsWithPlaces.map((templateField: TemplateField, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleFieldSelect(templateField)}
                  startIcon={<TextFields />}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    borderRadius: 1.5,
                    p: 1.5,
                    justifyContent: "flex-start",
                    textAlign: "start",
                    "&:hover": {
                      bgcolor: theme.palette.primary.light,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {templateField.field.name}
                </Button>
              ))}
            </Box>
          </>
        ) : (
          <Card sx={{ height: "100%", padding: "5px", boxShadow: "none" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Edit sx={{ color: theme.palette.primary.main, mr: 1, direction: "rtl" }} />
                <Typography sx={{ fontWeight: 400 }}>עריכת: {selectedField?.name}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                label="תוכן הטקסט"
                value={textValue}
                onChange={handleTextChange}
                sx={{ mb: 2, maxHeight: "200px", overflowY: "auto" }}
                InputProps={{
                  startAdornment: <TextFields sx={{ color: theme.palette.primary.main, mr: 1 }} />,
                }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>גופן</InputLabel>
                <Select
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  startAdornment={<FormatSize sx={{ color: theme.palette.primary.main, mr: 1 }} />}
                >
                  <MenuItem value="Arial">Arial</MenuItem>
                  <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                  <MenuItem value="Courier New">Courier New</MenuItem>
                  <MenuItem value="Verdana">Verdana</MenuItem>
                  <MenuItem value="Tahoma">Tahoma</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="גודל פונט"
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                inputProps={{ min: 10, max: 100 }}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <FormatSize sx={{ color: theme.palette.primary.main, mr: 1 }} />,
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ width: "48%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <ColorLens sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">צבע טקסט</Typography>
                  </Box>
                  <input
                    type="color"
                    value={textColor}
                    onChange={handleColorChange}
                    style={{ width: "100%", height: 30, padding: 0, border: "none" }}
                  />
                </Box>

                <Box sx={{ width: "48%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <ColorLens sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">צבע רקע</Typography>
                  </Box>
                  <input
                    type="color"
                    value={bgColor === "transparent" ? "#ffffff" : bgColor}
                    onChange={handleBgColorChange}
                    style={{ width: "100%", height: 30, padding: 0, border: "none" }}
                  />
                </Box>
              </Box>

              php-template
              Copy
              Edit
              <Button
                variant={isBold ? "contained" : "outlined"}
                onClick={toggleBold}
                startIcon={<FormatBold />}
                sx={{
                  mb: 2,
                  bgcolor: isBold ? theme.palette.secondary.main : "transparent",
                  color: isBold ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                }}
              >
                מודגש
              </Button>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }}>הזזת טקסט</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <IconButton
                  onClick={() => moveText(0, -5)}
                  sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                  aria-label="move up"
                >
                  <ArrowUpward />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
                <IconButton
                  onClick={() => moveText(-5, 0)}
                  sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                  aria-label="move left"
                >
                  <ArrowBack />
                </IconButton>
                <IconButton
                  onClick={() => moveText(5, 0)}
                  sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                  aria-label="move right"
                >
                  <ArrowForward />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
                <IconButton
                  onClick={() => moveText(0, 5)}
                  sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                  aria-label="move down"
                >
                  <ArrowDownward />
                </IconButton>
              </Box>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Close />}
                fullWidth
                onClick={handleExitEditing}
              >
                סגור עריכה
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Paper>
  )
}