import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const HeroSection = () => {

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);

    const handleStartNow = () => {
        console.log('handleStartNow');
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-");
        console.log("user");
        console.log(user);
        console.log("sessionStorage.getItem('token')");
        console.log(sessionStorage.getItem('token'));
        
        
        if(user?.id 
             && sessionStorage.getItem('userToken')
          ){
           console.log("'navigate('/chooseCategory') ");
        }
        else {
           console.log("'navigate('/login') ");
        }
       
        
        sessionStorage.getItem('userToken') && user?.id? navigate('/chooseCategory') : navigate('/login');
    };
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                p: 2,
                direction: 'rtl',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h3"
                fontSize={{ xs: '2rem', sm: '3rem', md: '3.5rem' }}
                fontWeight={700}
                color="primary"
                mb={2}
            >
                עיצוב הזמנות חכם
            </Typography>
            <Typography
                variant="h6"
                fontSize={{ xs: '1rem', sm: '1.25rem' }}
                color="text.secondary"
                maxWidth="600px"
                lineHeight={1.8}
                mb={4}
            >
                בחרי תבנית ייחודית, העלי את הקובץ שלך<br />
                וצרי עיצוב אוטומטי ברגע – הכל מבוסס AI ✨
            </Typography>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 3, sm: 6 }}
                mb={4}
                width={'80%'}
                justifyContent="center"
                alignItems="center"
            >
                <Stack alignItems="center" spacing={1} maxWidth={300}>
                    <SmartToyIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                        טכנולוגיית AI מתקדמת
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        מערכת מתקדמת לניתוח ועיצוב הזמנות במהירות ובדיוק מרבי.
                    </Typography>
                </Stack>

                <Stack alignItems="center" spacing={1} maxWidth={180}>
                    <UploadFileIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                        העלאת קבצים קלה
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        העלי קבצי טקסט או תמונות, וקבלי תבניות מעוצבות באופן אוטומטי.
                    </Typography>
                </Stack>

                <Stack alignItems="center" spacing={1} maxWidth={180}>
                    <DesignServicesIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                        עיצוב מותאם אישית
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        התאימי כל אלמנט בעיצוב בקלות ובמהירות עם ממשק משתמש אינטואיטיבי.
                    </Typography>
                </Stack>
            </Stack>

            <Button variant="contained" size="large" onClick={handleStartNow}>
                התחל עכשיו
            </Button>
        </Box>
    );
};

export default HeroSection;
