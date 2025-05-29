import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, Box, Button, Stack, Avatar, Menu,
    MenuItem, IconButton, Fade, ListItemIcon, ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import BrushIcon from '@mui/icons-material/Brush';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import theme from '../../theme';

// const getUserNameFromToken = (token: string | null): string => {
//     if (!token) return '';
//     try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         return payload?.name || '';
//     } catch {
//         return 'John Doe'; //ברירת מחדל
//     }
// };

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState<string>(location.pathname);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('userToken'));
    const [userName, setUserName] = useState<string>('');
    const user = useSelector((state: RootState) => state.user.user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setToken(sessionStorage.getItem('userToken'));
    }, [sessionStorage.getItem('userToken'),user]);

    useEffect(() => {
        setActive(location.pathname);
        const storedToken = sessionStorage.getItem('userToken');
        setToken(storedToken);
        if (storedToken) {
            // const name = getUserNameFromToken(storedToken);
            // setUserName(name || user.email.charAt(0).toUpperCase() || '');
            setUserName(user.firstName.charAt(0) || user.lastName.charAt(0))
        }
    }, [location.pathname, user]);

    const handleLogout = () => {
        sessionStorage.removeItem('userToken');
        setToken(null);
        setUserName('');
        navigate('/');
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSettings = () => {
        handleMenuClose();
        navigate('/updateUser');
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
                    <Box display="flex" alignItems="center" gap={1} mb={{ xs: 1, sm: 0 }}>
                        <BrushIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="h6" fontSize={{ xs: '1rem', sm: '1.25rem' }}>
                            InvitatiOnline
                        </Typography>
                    </Box>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        alignItems="center"
                        sx={{ justifyContent: 'flex-end' }}
                    >
                        {user?.firstName && token && (
                            <>
                                <Button
                                    color={active === '/' ? 'primary' : 'inherit'}
                                    sx={{ fontWeight: 500 }}
                                    onClick={() => navigate('/')}
                                >
                                    בית
                                </Button>
                                <Button
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                    onClick={() => navigate('/MyCompletedInvitation')}
                                >
                                    ההזמנות שלי
                                </Button>
                                <Button
                                    color="primary"
                                    sx={{ fontWeight: 500 }}
                                    onClick={() => navigate('/chooseCategory')}
                                >
                                    יצירת הזמנה
                                </Button>
                            </>
                        )}

                        {token ? (
                            <>
                                <IconButton onClick={handleMenuClick}>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        {userName.charAt(0).toUpperCase() || <PersonIcon />}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    TransitionComponent={Fade}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        elevation: 4,
                                        sx: {
                                            borderRadius: 2,
                                            minWidth: 180,
                                            backgroundColor: 'background.paper',
                                            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleSettings}>
                                        <ListItemIcon>
                                            <SettingsIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>הגדרות</ListItemText>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleMenuClose();
                                            handleLogout();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>התנתקות</ListItemText>
                                    </MenuItem>
                                </Menu>
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
                                        backgroundColor: 'transparent',
                                        color: 'primary.dark',
                                        borderColor: 'primary.dark',
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
