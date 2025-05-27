import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        zIndex: 1000,
        textAlign: 'center',
        py: 2,
        backgroundColor: '#141e30',
        color: '#fff',
      }}
    >
      <Typography variant="body2">© InvitionLine 2025 כל הזכויות שמורות</Typography>
      <Typography variant="body2">concat us at
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=noreply.invitationline@gmail.com&su=פנייה%20מאתר%20InvitationLine&body=שלום%20רציתי%20לפנות%20בנוגע%20ל..."
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0077cc', textDecoration: 'none', marginLeft: '5px' }}
        >
          support@invitatiOnline.co.il
        </a>
      </Typography>


    </Box>
  );
};

export default Footer;
