import { useEffect, useState } from "react"
import { Box, CircularProgress, Typography, Button, useTheme } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Category } from "../../models/Category"
import { motion } from "framer-motion"
import CategoryIcon from "@mui/icons-material/Category"

export default function ChooseCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Category`)
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

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory((prev) =>
      prev?.id === category.id ? null : category
    )
  }

  const handleContinue = () => {
    if (selectedCategory) {
      sessionStorage.setItem("category", JSON.stringify(selectedCategory))
      navigate("/showTemplates")
    }
  }

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 4 },
        py: 5,
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 5,
          fontWeight: 800,
          color: theme.palette.primary.main,
          textAlign: "right",
          alignSelf: "flex-start",
        }}
      >
        בחר קטגוריה
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 4,
            width: "100%",
          }}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory?.id === category.id
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    p: 2,
                    height: 160,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${isSelected ? theme.palette.primary.main : "transparent"}`,
                    boxShadow: isSelected
                      ? "0 0 10px rgba(0,0,0,0.1)"
                      : "0 2px 6px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CategoryIcon color="primary"/>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>

                  <Button
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => handleCategoryClick(category)}
                    color="primary"
                    fullWidth
                  >
                    {isSelected ? "בטל בחירה" : "בחר"}
                  </Button>
                </Box>
              </motion.div>
            )
          })}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        disabled={!selectedCategory}
        onClick={handleContinue}
        sx={{
          mt: 6,
          px: 6,
          py: 1.5,
          fontSize: "1.1rem",
          borderRadius: "2rem",
        }}
      >
        המשך
      </Button>
    </Box>
  )
}
