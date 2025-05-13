


import type React from "react";
import { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import { Outlet, useNavigate } from "react-router"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"
import { useSelector } from "react-redux"
import UpdateUser from "../pages/login/UpdateUser"
import SingInAndUp from "../pages/login/SingInAndUp";
import { RootState } from "../redux/Store";
import { UserId } from "../Services/User";

export default () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user)

    // State for avatar menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    //state for setting
    const [setting, setSetsetting] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const open = Boolean(anchorEl)

    // State for contact dialog
    const [contactOpen, setContactOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    // State for mobile drawer
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        console.log("👤 המשתמש השתנה:", user);
        // if (sessionStorage.getItem("userToken") ) {
            setIsLogin(true);
        // }
        console.log("isLogin: in useEffect applayout", isLogin);
    }, [user]);

    // Handle avatar menu
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // Handle logout
    const logOut = () => {
        sessionStorage.removeItem("userToken");
        setIsLogin(false);
        navigate("/")
        handleClose()
    }

    // Handle contact form
    const handleContactOpen = () => {
        setContactOpen(true)
    }

    const handleContactClose = () => {
        setContactOpen(false)
    }

    const handleContactSubmit = () => {
        console.log("Sending email:", { email, message })
        setContactOpen(false)
        setEmail("")
        setMessage("")
        alert("תודה! ההודעה נשלחה בהצלחה")
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "#f8f9fa",
            }}
        >
            {/* App Bar */}
            <AppBar
                position="fixed"
                color="default"
                elevation={0}
                sx={{ height: "80px", justifyContent: "center", bgcolor: "rgb(242,242,242)", width: "100%" }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        px: { xs: 2, md: 6 },
                    }}
                >
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 700,
                            color: "var(--primary-color)",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        עיצוב הזמנות
                    </Typography>

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                direction: "rtl",
                            }}
                        >
                            {isLogin ? (
                                // {user ? (
                                <>
                                    {/* Avatar on the far right */}
                                    <Avatar
                                        sx={{
                                            bgcolor: "var(--primary-color)",
                                            cursor: "pointer",
                                            marginRight: "10px",
                                        }}
                                        onClick={handleMenu}
                                    >
                                        {user.user.firstName?.charAt(0)}
                                    </Avatar>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                handleClose()
                                                setSetsetting(true)
                                            }}
                                        >
                                            <div style={{ padding: "8px" }}>הגדרות</div>
                                            <SettingsIcon />
                                        </MenuItem>

                                        <MenuItem onClick={logOut}>
                                            <div style={{ padding: "8px" }}>התנתק</div>
                                            <LogoutIcon />
                                        </MenuItem>
                                    </Menu>

                                    {/* Navigation links next to avatar */}
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/")}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "20px",
                                            "&:active": {
                                                border: `3px solid var(--primary-color)`, // צבע אדום כהה יותר בעת לחיצה
                                            },
                                        }}
                                    >
                                        דף הבית
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/chooseCategory")}
                                        sx={{
                                            fontFamily: "unset",
                                            fontWeight: 600,
                                            fontSize: "20px",
                                            "&:active": {
                                                border: `3px solid var(--primary-color)`, // צבע אדום כהה יותר בעת לחיצה
                                            },
                                        }}
                                    >
                                        צור הזמנה
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/MyCompletedInvitation")}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "20px",
                                            "&:active": {
                                                border: `3px solid var(--primary-color)`, // צבע אדום כהה יותר בעת לחיצה
                                            },
                                        }}
                                    >
                                        הזמנות שלי
                                    </Button>
                                </>
                            ) : (
                                <SingInAndUp />
                            )}
                            {setting && <UpdateUser />}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, pt: 2, direction: "rtl" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "var(--primary-color)" }}>
                            תפריט
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>X</IconButton>
                    </Box>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate("/")
                                    setDrawerOpen(false)
                                }}
                            >
                                <ListItemText sx={{ textAlign: "right" }} primary="דף הבית" />
                            </ListItemButton>
                        </ListItem>

                        {isLogin ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/chooseCategory")
                                            setDrawerOpen(false)
                                        }}
                                    >
                                        <ListItemText sx={{ textAlign: "right" }} primary="צור הזמנה" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/MyCompletedInvitation"),
                                            setDrawerOpen(false)
                                        }}
                                    >
                                        <ListItemText sx={{ textAlign: "right" }} primary="ההזמנות שלי" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate("/profile")
                                            setDrawerOpen(false)
                                        }}
                                    >
                                        <ListItemText sx={{ textAlign: "right" }} primary="הגדרות" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            logOut()
                                            setDrawerOpen(false)
                                        }}
                                    >
                                        <ListItemText sx={{ textAlign: "right" }} primary="התנתק" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem>
                                <SingInAndUp />
                            </ListItem>
                        )}

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    handleContactOpen()
                                    setDrawerOpen(false)
                                }}
                            >
                                <ListItemText sx={{ textAlign: "right" }} primary="צור קשר" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ width: "100vw", flexGrow: 1, mt: "80px" }}>
                <Outlet />
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    width: "100vw",
                    marginTop: "20px",
                    py: 3,
                    // px: 2,
                    // mt: "auto",
                    bgcolor: "#333",
                    color: "white",
                }}>
                <Box>
                    <Grid container spacing={3} direction="row-reverse">
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mb: 2, direction: "rtl" }}>
                                עיצוב הזמנות
                            </Typography>
                            <Typography variant="body2" sx={{ direction: "rtl" }}>
                                הפלטפורמה המובילה לעיצוב הזמנות לכל סוגי האירועים
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mb: 2, direction: "rtl" }}>
                                קישורים מהירים
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <Button color="inherit" sx={{ justifyContent: "flex-end" }} onClick={() => navigate("/")}>
                                    דף הבית
                                </Button>
                                <Button color="inherit" sx={{ justifyContent: "flex-end" }} onClick={() => navigate("/chooseCategory")}>
                                    צור הזמנה
                                </Button>
                                <Button
                                    color="inherit"
                                    sx={{ justifyContent: "flex-end" }}
                                    onClick={() => navigate("/MyCompletedInvitation")}
                                >
                                    הזמנות שלי
                                </Button>
                                <Button color="inherit" sx={{ justifyContent: "flex-end" }} onClick={handleContactOpen}>
                                    צור קשר
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ mb: 2, direction: "rtl" }}>
                                צור קשר
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 1 }}>
                                <Typography variant="body2" sx={{ direction: "rtl" }}>
                                    info@invitations-design.com
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleContactOpen}
                                sx={{
                                    borderColor: "white",
                                    color: "white",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.1)",
                                        borderColor: "white",
                                    },
                                    mt: 1,
                                }}
                            >
                                שלח הודעה
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                        © {new Date().getFullYear()} עיצוב הזמנות. כל הזכויות שמורות.
                    </Typography>
                </Box>
            </Box>

            {/* Contact Dialog */}
            <Dialog open={contactOpen} onClose={handleContactClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ direction: "rtl", fontWeight: 700 }}>צור קשר</DialogTitle>
                <DialogContent sx={{ direction: "rtl" }}>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        יש לך שאלות? נשמח לעזור! מלא את הפרטים ונחזור אליך בהקדם.
                    </Typography>
                    <TextField
                        autoFocus
                        label="כתובת אימייל"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2, direction: "rtl" }}
                    />
                    <TextField
                        label="הודעה"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ direction: "rtl" }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleContactClose} color="inherit">
                        ביטול
                    </Button>
                    <Button
                        onClick={handleContactSubmit}
                        variant="contained"
                        sx={{ bgcolor: "var(--primary-color)", "&:hover": { bgcolor: "#e05e52" } }}
                    >
                        שלח
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

