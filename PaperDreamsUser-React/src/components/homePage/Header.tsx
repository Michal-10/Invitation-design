import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Stack, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
// import { RootState } from '../../redux/Store';
// import { useSelector } from 'react-redux';

// פונקציה שמחזירה את שם המשתמש לפי הטוקן
const getUserNameFromToken = (token: string | null): string => {
    // כאן את יכולה לשים את הפונקציה הקיימת שלך שמפענחת את שם המשתמש
    if (!token) return '';
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        console.log('payload');
        console.log(payload);
        return payload?.name || '';
    } catch {
        return 'John Doe'; // שם ברירת מחדל במקרה של שגיאה
    }
};

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState<string>(location.pathname);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('userToken'));
    const [userName, setUserName] = useState<string>('');
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        setToken(sessionStorage.getItem('userToken'));
    }, [sessionStorage.getItem('userToken')]);

    useEffect(() => {
        console.log('user')
        console.log(user)

        setActive(location.pathname);
        const storedToken = sessionStorage.getItem('userToken');
        setToken(storedToken);
        if (storedToken) {
            const name = getUserNameFromToken(storedToken);
            setUserName(name);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        sessionStorage.removeItem('userToken');
        setToken(null);
        setUserName('');
        navigate('/');
    };

    return (
        <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{
                    backdropFilter: 'blur(8px)',
                    borderBottom: '2px solid #ff6f61',
                    direction: 'ltr',
                    width: '100vw',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        px: { xs: 2, sm: 4 },
                        py: 1,
                    }}
                >
                    {/* לוגו */}
                    <Box display="flex" alignItems="center" gap={1} mb={{ xs: 1, sm: 0 }}>
                        <BrushIcon sx={{ color: 'primary' }} />
                        <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
                            InvantationLine
                        </Typography>
                    </Box>

                    {/* תפריט ניווט וכפתור התחברות/התנתקות */}

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        alignItems="center"
                        sx={{ justifyContent: 'flex-end' }}
                    >


                        {user?.id && token &&
                            <><Button
                                color={active === '/' ? 'primary' : 'inherit'}
                                sx={{ fontWeight: 500 }}
                                onClick={() => navigate('/')}
                            >
                                בית
                            </Button>
                                <Button
                                    color={'primary'}
                                    sx={{ fontWeight: 500 }}
                                    onClick={() => navigate('/MyCompletedInvitation')}
                                >
                                    ההזמנות שלי
                                </Button>
                                <Button
                                    color={'primary'}
                                    sx={{ fontWeight: 500 }}
                                    onClick={() => navigate('/chooseCategory')}
                                >
                                    יצירת הזמנה
                                </Button></>}



                        {token ? (
                            <>
                                <Avatar>
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                    sx={{
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        px: 2,
                                        py: 0.5,
                                    }}
                                >
                                    התנתקות
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    px: 2,
                                    py: 0.5,
                                    '&:hover': {
                                        backgroundColor: 'transparent', // ביטול מילוי רקע במעבר עכבר
                                        color: 'primary.dark', // שינוי צבע הטקסט במעבר עכבר
                                        borderColor: 'primary.dark', // שינוי צבע הגבול במעבר עכבר
                                    },
                                }}
                                component={Link}
                                to="/login"
                            >
                                התחברות
                            </Button>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default Header;
