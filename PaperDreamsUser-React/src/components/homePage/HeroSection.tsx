import { Box, Typography, Button, Avatar, Card, CardActions, CardContent, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const HeroSection = () => {

    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)

    const handleStartNow = () => {
        sessionStorage.getItem('userToken') && user?.id ? navigate('/chooseCategory') : navigate('/login');
    };

    return (
        <>

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Box
                    sx={{ bgcolor: "white", py: 8, textAlign: "center" }} >
                    <Box sx={{ paddingBottom: '17px', paddingTop: '10px' }}>
                        <Typography variant="h2" component="h1"
                            sx={{
                                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                                fontWeight: 700, mb: 2, alignItems: 'center',
                                color: "#333",
                                direction: "rtl",
                            }}
                        >
                            עיצוב הזמנות מקצועי בקליק
                        </Typography>
                        <Typography variant="h5" sx={{ margin: '10px', color: "#666", direction: "rtl" }}>
                            בחר תבנית, העלה קובץ, וקבל הזמנה מעוצבת בצורה מושלמת
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleStartNow}
                            sx={{
                                bgcolor: "var(--primary-color)",
                                marginTop:'5px',
                                "&:hover": { bgcolor: "#e05e52" },
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "1.3rem",
                            }}
                        >
                            התחל עכשיו
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ py: 5 }}>
                    <Box>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 4,
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
                                                <EditIcon sx={{ fontSize: 30, color: "#fff" }} />
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
                                            onClick={() => navigate("/chooseCategory")}
                                            sx={{
                                                fontSize: "20px",
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
                                                <RocketLaunchIcon style={{ fontSize: 30, color: '#fff' }} />
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
                                            onClick={() => navigate("/chooseCategory")}
                                            sx={{
                                                fontSize: "20px",
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
                                                <TuneIcon sx={{ fontSize: 30, color: "#fff" }} />
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
                                        <Button onClick={() => navigate("/chooseCategory")} sx={{
                                            fontSize: "20px",
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
                            <Button variant="contained" size="large" 
                            onClick={handleStartNow}
                                sx={{ bgcolor: "white", color: "var(--primary-color)", "&:hover": { bgcolor: "#f0f0f0" }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                צור הזמנה
                            </Button>


                            <Button variant="outlined" size="large"
                                sx={{ borderColor: "white", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white", }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=noreply.invitationline@gmail.com&su=פנייה%20מאתר%20InvitationLine&body=שלום%20רציתי%20לפנות%20בנוגע%20ל..."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px' }}
                                >
                                    צור קשר
                                </a>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default HeroSection;
