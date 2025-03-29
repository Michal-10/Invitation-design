
import type React from "react"
import { useState } from "react"
import type { fabric } from "fabric"
import type { TemplateField } from "../../models/TemplateField"
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
  Tooltip,
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

export default function TextEditorSidebar({ canvas, fields }: { canvas: fabric.Canvas; fields: TemplateField[] }) {
  const [selectedField, setSelectedField] = useState<TemplateField | null>(null)
  const [textValue, setTextValue] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(30)
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [textColor, setTextColor] = useState<string>("#000000")
  const [bgColor, setBgColor] = useState<string>("transparent")
  const [isBold, setIsBold] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleFieldSelect = (field: TemplateField) => {
    setSelectedField(field);
    setTextValue(field.fieldName);
    setIsEditing(true);

    if (canvas) {
      const textObj = canvas.getObjects().find((obj) => obj.left === field.x && obj.top === field.y) as fabric.Text

      if (textObj) {
        setFontSize(textObj.fontSize || 30);
        setFontFamily(textObj.fontFamily || "Arial");
        setTextColor(textObj.fill as string);
        setBgColor(textObj.backgroundColor || "transparent");
        setIsBold(textObj.fontWeight === "bold");
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
        direction: 'ltr',
        height: "100%",
        // overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: "var(--primary-color)",
          color: "white",
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
              {fields.map((field, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleFieldSelect(field)}
                  startIcon={<TextFields />}
                  sx={{
                    borderColor: "var(--primary-color)",
                    color: "#333",
                    borderRadius: 1.5,
                    p: 1.5,
                    justifyContent: "flex-start",
                    textAlign: "start",
                    "&:hover": {
                      bgcolor: "rgba(255,111,97,0.05)",
                      borderColor: "var(--primary-color)",
                    },
                  }}
                >
                  {field.fieldName}
                </Button>
              ))}
            </Box>
          </>
        ) : (
          <Card sx={{ height: '100%', padding: '5px', boxShadow: "none" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Edit sx={{ color: "var(--primary-color)", mr: 1, direction: 'rtl' }} />
                <Typography sx={{ fontWeight: 400 }}>
                  עריכת: {selectedField?.fieldName}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <TextField
                fullWidth
                label="תוכן הטקסט"
                value={textValue}
                onChange={handleTextChange}
                sx={{ mb: 2, maxHeight: "200px", overflowY: "auto" }} // שינוי זה
                InputProps={{
                  startAdornment: <TextFields sx={{ color: "var(--primary-color)", mr: 1 }} />,
                }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>גופן</InputLabel>
                <Select
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  startAdornment={<FormatSize sx={{ color: "var(--primary-color)", mr: 1 }} />}
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
                  startAdornment: <FormatSize sx={{ color: "var(--primary-color)", mr: 1 }} />,
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ width: "48%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <ColorLens sx={{ color: "var(--primary-color)", mr: 1, fontSize: 20 }} />
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
                    <ColorLens sx={{ color: "var(--primary-color)", mr: 1, fontSize: 20 }} />
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

              <Button
                fullWidth
                variant={isBold ? "contained" : "outlined"}
                onClick={toggleBold}
                sx={{
                  bgcolor: isBold ? "var(--primary-color)" : "transparent",
                  borderColor: "var(--primary-color)",
                  color: isBold ? "white" : "var(--primary-color)",
                  "&:hover": {
                    bgcolor: isBold ? "#e05e52" : "rgba(255,111,97,0.05)",
                    borderColor: "var(--primary-color)",
                  },
                }}
                startIcon={<FormatBold />}
              >
                {isBold ? "בטל הדגשה" : "הדגש טקסט"}
              </Button>

              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, textAlign: "center" }}>
                הזזת טקסט
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                <Tooltip title="הזז למעלה">
                  <IconButton
                    onClick={() => moveText(0, -5)}
                    sx={{
                      bgcolor: "rgba(255,111,97,0.1)",
                      color: "var(--primary-color)",
                      "&:hover": { bgcolor: "rgba(255,111,97,0.2)" },
                    }}
                  >
                    <ArrowUpward />
                  </IconButton>
                </Tooltip>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Tooltip title="הזז שמאלה">
                    <IconButton
                      onClick={() => moveText(-5, 0)}
                      sx={{
                        bgcolor: "rgba(255,111,97,0.1)",
                        color: "var(--primary-color)",
                        "&:hover": { bgcolor: "rgba(255,111,97,0.2)" },
                      }}
                    >
                      <ArrowBack />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="הזז ימינה">
                    <IconButton
                      onClick={() => moveText(5, 0)}
                      sx={{
                        bgcolor: "rgba(255,111,97,0.1)",
                        color: "var(--primary-color)",
                        "&:hover": { bgcolor: "rgba(255,111,97,0.2)" },
                      }}
                    >
                      <ArrowForward />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Tooltip title="הזז למטה">
                  <IconButton
                    onClick={() => moveText(0, 5)}
                    sx={{
                      bgcolor: "rgba(255,111,97,0.1)",
                      color: "var(--primary-color)",
                      "&:hover": { bgcolor: "rgba(255,111,97,0.2)" },
                    }}
                  >
                    <ArrowDownward />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ marginTop: '8px', display: "flex", justifyContent: "center", gap: 1 }}>
                <Button
                  variant="outlined"
                  sx={{ mb: 2, color: "var(--primary-color)", border: '2px solid var(--primary-color)' }}
                  startIcon={<Close />}
                  onClick={handleExitEditing}
                >
                  סיים עריכה
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Paper>
  )
}
