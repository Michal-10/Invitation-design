import { useEffect, useState } from "react"
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  useTheme,
} from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Category } from "../../models/Category"
import { motion } from "framer-motion"
import StarIcon from "@mui/icons-material/Star"

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
        console.log("before getCategories");
        console.log(`${import.meta.env.VITE_API_URL}/Category`);
        
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/Category`)
        console.log("after getCategories");
        console.log("------------------");
        
        console.log(res.data);
      
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
        width: "90vw",
        px: { xs: 2, md: 4 },
        py: 5,
        bgcolor: "#f4f4f4",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
                    p: 3,
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: isSelected ? theme.palette.primary.light : "#fff",
                    border: `2px solid ${
                      isSelected
                        ? theme.palette.primary.main
                        : "transparent"
                    }`,
                    boxShadow: isSelected
                      ? "0 0 10px rgba(0,0,0,0.15)"
                      : "0 2px 6px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <StarIcon
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      color: isSelected
                        ? theme.palette.primary.main
                        : "grey.400",
                      fontSize: 24,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.dark,
                      mb: 2,
                    }}
                  >
                    {category.name}
                  </Typography>

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
