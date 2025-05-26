import { Box, Typography, Button, Avatar, Card, CardActions, CardContent, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const HeroSection = () => {

    // const navigate = useNavigate();
    // const user = useSelector((state: RootState) => state.user.user);

    // const handleStartNow = () => {
    //     console.log('handleStartNow');
    //     console.log("-*-*-*-*-*-*-*-*-*-*-*-*-");
    //     console.log("user");
    //     console.log(user);
    //     console.log("sessionStorage.getItem('token')");
    //     console.log(sessionStorage.getItem('token'));


    //     if(user?.id 
    //          && sessionStorage.getItem('userToken')
    //       ){
    //        console.log("'navigate('/chooseCategory') ");
    //     }
    //     else {
    //        console.log("'navigate('/login') ");
    //     }


    //     sessionStorage.getItem('userToken') && user?.id? navigate('/chooseCategory') : navigate('/login');
    // };
    // return (
    //     <Box
    //         component={motion.div}
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1 }}
    //         sx={{
    //             width: '100vw',
    //             height: '100vh',
    //             display: 'flex',
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             boxSizing: 'border-box',
    //             p: 2,
    //             direction: 'rtl',
    //             textAlign: 'center',
    //         }}
    //     >
    //         <Typography
    //             variant="h3"
    //             fontSize={{ xs: '2rem', sm: '3rem', md: '3.5rem' }}
    //             fontWeight={700}
    //             color="primary"
    //             mb={2}
    //         >
    //             עיצוב הזמנות חכם 
    //         </Typography>
    //         <Typography
    //             variant="h6"
    //             fontSize={{ xs: '1rem', sm: '1.25rem' }}
    //             color="text.secondary"
    //             maxWidth="600px"
    //             lineHeight={1.8}
    //             mb={4}
    //         >
    //             בחרי תבנית ייחודית, העלי את הקובץ שלך<br />
    //             וצרי עיצוב אוטומטי ברגע – הכל מבוסס AI ✨
    //         </Typography>

    //         <Stack
    //             direction={{ xs: 'column', sm: 'row' }}
    //             spacing={{ xs: 3, sm: 6 }}
    //             mb={4}
    //             width={'80%'}
    //             justifyContent="center"
    //             alignItems="center"
    //         >
    //             <Stack alignItems="center" spacing={1} maxWidth={300}>
    //                 <SmartToyIcon color="primary" sx={{ fontSize: 50 }} />
    //                 <Typography variant="subtitle1" fontWeight={600}>
    //                     טכנולוגיית AI מתקדמת
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     מערכת מתקדמת לניתוח ועיצוב הזמנות במהירות ובדיוק מרבי.
    //                 </Typography>
    //             </Stack>

    //             <Stack alignItems="center" spacing={1} maxWidth={180}>
    //                 <UploadFileIcon color="primary" sx={{ fontSize: 50 }} />
    //                 <Typography variant="subtitle1" fontWeight={600}>
    //                     העלאת קבצים קלה
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     העלי קבצי טקסט או תמונות, וקבלי תבניות מעוצבות באופן אוטומטי.
    //                 </Typography>
    //             </Stack>

    //             <Stack alignItems="center" spacing={1} maxWidth={180}>
    //                 <DesignServicesIcon color="primary" sx={{ fontSize: 50 }} />
    //                 <Typography variant="subtitle1" fontWeight={600}>
    //                     עיצוב מותאם אישית
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     התאימי כל אלמנט בעיצוב בקלות ובמהירות עם ממשק משתמש אינטואיטיבי.
    //                 </Typography>
    //             </Stack>
    //         </Stack>

    //         <Button variant="contained" size="large" onClick={handleStartNow}>
    //             התחל עכשיו
    //         </Button>
    //     </Box>
    // );


    // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const navigate = useNavigate()
    // const user = useSelector((state: RootState) => state.user.user)

    //state for setting
    // const [setting, setSetsetting] = useState<boolean>(false)
    // const open = Boolean(anchorEl)

    // // State for contact dialog
    // const [, setContactOpen] = useState(false)
    const user = useSelector((state: RootState) => state.user.user)

    // // Handle contact form
    // const handleContactOpen = () => {
    //     // setContactOpen(true)
    // }

    const handleStartNow = () => {
        console.log('handleStartNow');
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-");
        console.log("user");
        console.log(user);
        console.log("sessionStorage.getItem('token')");
        console.log(sessionStorage.getItem('token'));


        if (user?.id
            && sessionStorage.getItem('userToken')
        ) {
            console.log("'navigate('/chooseCategory') ");
        }
        else {
            console.log("'navigate('/login') ");
        }


        sessionStorage.getItem('userToken') && user?.id ? navigate('/chooseCategory') : navigate('/login');
    };

    return (
        <>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {/* Hero Section */}
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

                {/* Features Section */}
                <Box sx={{ py: 5/*, width: "100%" */ }}>
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


                            <Button variant="outlined" size="large"
                                sx={{ borderColor: "white", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white", }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=noreply.invitationline@gmail.com&su=פנייה%20מאתר%20InvitationLine&body=שלום%20רציתי%20לפנות%20בנוגע%20ל..."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#0077cc', textDecoration: 'none', marginLeft: '5px' }}
                                >
                                    צור קשר
                                </a>
                            </Button>
                            {/* <Button variant="outlined" size="large" onClick={handleContactOpen}
                                sx={{ borderColor: "white", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white", }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
                                צור קשר
                            </Button> */}



                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default HeroSection;
