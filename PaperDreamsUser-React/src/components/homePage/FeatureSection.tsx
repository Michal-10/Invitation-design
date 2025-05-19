import { Grid, Typography, Box } from '@mui/material';
import { Bolt, Security, Brush } from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  { icon: <Bolt fontSize="large" />, title: 'מהירות שיא', description: 'ביצועים מדהימים בכל פעולה' },
  { icon: <Security fontSize="large" />, title: 'אבטחה מלאה', description: 'הגנה חזקה על הנתונים שלך' },
  { icon: <Brush fontSize="large" />, title: 'עיצוב נקי', description: 'ממשק חדשני ונוח' },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, px: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        למה דווקא אצלנו?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1">{feature.description}</Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
