import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 2,
        backgroundColor: '#141e30',
        color: '#fff',
      }}
    >
      <Typography variant="body2">© InvitionLine 2025 כל הזכויות שמורות</Typography>
      <Typography variant="body2">concat us at <a href="mailto:r0527102247@gmail.com">InvitationLine@support.com</a></Typography>
    </Box>
  );
};

export default Footer;
