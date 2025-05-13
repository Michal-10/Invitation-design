
import type React from "react"
import { useState } from "react"
import {
     Typography, Button, Avatar, Grid, Card, CardContent, CardActions,Box,useMediaQuery
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { FaEnvelope } from "react-icons/fa"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export default () => {
    const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const navigate = useNavigate()
    // const user = useSelector((state: RootState) => state.user.user)

    // State for avatar menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    //state for setting
    // const [setting, setSetsetting] = useState<boolean>(false)
    const open = Boolean(anchorEl)

    // // State for contact dialog
    const [contactOpen, setContactOpen] = useState(false)
    // const [email, setEmail] = useState("")
    // const [message, setMessage] = useState("")

    // State for mobile drawer
    // const [drawerOpen, setDrawerOpen] = useState(false)

    // Check if user is logged in
    // const isLoggedIn = !!sessionStorage.getItem("userToken")

    // // Handle avatar menu
    // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    // }

    // Handle logout
    // const logOut = () => {
    //     sessionStorage.removeItem("userToken")
    //     navigate("/")
    //     handleClose()
    // }

    // // Handle contact form
    const handleContactOpen = () => {
        setContactOpen(true)
    }

    return (
        <>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {/* Hero Section */}
                <Box
                    sx={{ bgcolor: "white", py: 8, textAlign: "center" }} >
                    <Box sx={{ paddingBottom: '35px', paddingTop: '35px' }}>
                        <Typography variant="h2" component="h1"
                            sx={{
                                fontWeight: 700, mb: 2, alignItems: 'center',
                                color: "#333",
                                direction: "rtl",
                            }}
                        >
                            עיצוב הזמנות מקצועי בקליק
                        </Typography>
                        <Typography variant="h5" sx={{ margin: '15px', color: "#666", direction: "rtl" }}>
                            בחר תבנית, העלה קובץ, וקבל הזמנה מעוצבת בצורה מושלמת
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/chooseCategory")}
                            sx={{
                                bgcolor: "var(--primary-color)",
                                "&:hover": { bgcolor: "#e05e52" },
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "1.1rem",
                            }}
                        >
                            התחל עכשיו
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ py: 8/*, width: "100%" */ }}>
                    <Box>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 6,
                                textAlign: "center",
                                color: "#333",
                                direction: "rtl",
                            }}
                        >
                            למה לבחור בנו?
                        </Typography>

                        <Grid container spacing={4} direction="row-reverse">
                            <Grid item xs={12} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                        "&:hover": {
                                            transform: "translateY(-10px)",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                mb: 2,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "var(--primary-color)",
                                                    width: 70,
                                                    height: 70,
                                                }}
                                            >
                                                <FaEnvelope size={30} color="#fff" />
                                            </Avatar>
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                            עיצוב מקצועי
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            מגוון רחב של תבניות מעוצבות על ידי מעצבים מקצועיים, המתאימות לכל סוג של אירוע ולכל סגנון.
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                                        <Button
                                            size="small"
                                            onClick={() => navigate("/chooseCategory")}
                                            sx={{
                                                color: "var(--primary-color)",
                                                "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
                                            }}
                                        >
                                            צפה בתבניות
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                        "&:hover": {
                                            transform: "translateY(-10px)",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2, }} >
                                            <Avatar sx={{ bgcolor: "var(--primary-color)", width: 70, height: 70, }}>
                                                <FaEnvelope size={30} color="#fff" />
                                            </Avatar>
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                            מהיר וקל לשימוש
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            תהליך פשוט ומהיר שמאפשר לך ליצור הזמנה מושלמת תוך דקות ספורות, ללא צורך בידע מקצועי בעיצוב.
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                                        <Button
                                            size="small"
                                            onClick={() => navigate("/chooseCategory")}
                                            sx={{
                                                color: "var(--primary-color)",
                                                "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
                                            }}
                                        >
                                            איך זה עובד
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                        "&:hover": {
                                            transform: "translateY(-10px)",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                            <Avatar sx={{ bgcolor: "var(--primary-color)", width: 70, height: 70, }}>
                                                <FaEnvelope size={30} color="#fff" />
                                            </Avatar>
                                        </Box>
                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                            התאמה אישית
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            אפשרות להתאים את ההזמנה לצרכים האישיים שלך, כולל צבעים, גופנים, תמונות ועוד, כדי ליצור הזמנה
                                            ייחודית.
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                                        <Button size="small" onClick={() => navigate("/chooseCategory")} sx={{
                                            color: "var(--primary-color)",
                                            "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
                                        }}>
                                            אפשרויות התאמה
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* Call to Action */}
                <Box
                    sx={{ bgcolor: "var(--primary-color)", color: "white", py: 8, textAlign: "center" }}>
                    <Box >
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3, direction: "rtl", }}>
                            מוכנים להתחיל?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ mb: 4, direction: "rtl" }}>
                            צור הזמנה מרשימה בקלות ובמהירות, או צור קשר אם יש לך שאלות
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                            <Button variant="contained" size="large" onClick={() => navigate("/chooseCategory")}
                                sx={{ bgcolor: "white", color: "var(--primary-color)", "&:hover": { bgcolor: "#f0f0f0" }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                צור הזמנה
                            </Button>
                            <Button variant="outlined" size="large" onClick={handleContactOpen}
                                sx={{ borderColor: "white", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white", }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                צור קשר
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

