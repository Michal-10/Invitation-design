
import type React from "react"
import { useEffect, useState } from "react"
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material"
import { styleModal } from "../models/style"
import type { Category } from "../models/Category"
import axios from "axios"
import { useNavigate } from "react-router"

export default function ChooseCategoryTemplate() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [openModal, ] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  // Handle category selection
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedCategory === "") {
      alert("בחר קטגוריה")
      return
    }

    console.log("Selected category:", selectedCategory)
    navigate('/showTemplates');

  }

  // Fetch categories from API
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:5077/api/Category")
        setCategories(res.data)
      } catch (error) {
        console.error("שגיאה בשליפת הקטגוריות:", error)
        alert("אירעה שגיאה בשליפת הקטגוריות")
      } finally {
        setLoading(false)
      }
    }
    getCategories()

  }, [])

  return (
    <>
      {/* Category Selection Modal */}
      <Modal open={openModal}>
        <Box
          sx={{
            ...styleModal,
            maxWidth: 500,
            width: "90%",
            borderRadius: 2,
            p: 4,
            direction: "rtl",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
            בחר קטגוריה
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress sx={{ color: "var(--primary-color)" }} />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" sx={{ direction: "rtl", textAlign: "right", mb: 3 }}>
                <InputLabel>קטגוריה</InputLabel>
                <Select
                  value={selectedCategory || ""}
                  onChange={(e) => {
                    console.log("Category selected:", e.target.value)
                    sessionStorage.setItem("category",e.target.value);
                    setSelectedCategory(e.target.value)
                  }}
                  style={{ textAlign: "right" }}
                >
                  <MenuItem value="" disabled>
                    בחר קטגוריה
                  </MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={JSON.stringify(category)}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                sx={{
                  bgcolor: "var(--primary-color)",
                  "&:hover": { bgcolor: "#e05e52" },
                  color: "white",
                  py: 1,
                }}
                variant="contained"
                fullWidth
                type="submit"
              >
                המשך
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </>
  )
}

