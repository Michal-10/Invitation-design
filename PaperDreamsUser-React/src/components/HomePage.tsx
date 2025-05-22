
// import { useState } from "react"
// import {
//      Typography, Button, Avatar, Grid, Card, CardContent, CardActions,Box,
// } from "@mui/material"
// import { FaEnvelope } from "react-icons/fa"
// import { useNavigate } from "react-router"

// export default () => {
//     // const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//     const navigate = useNavigate()
//     // const user = useSelector((state: RootState) => state.user.user)

//     //state for setting
//     // const [setting, setSetsetting] = useState<boolean>(false)
//     // const open = Boolean(anchorEl)

//     // // State for contact dialog
//     const [, setContactOpen] = useState(false)
   

//     // // Handle contact form
//     const handleContactOpen = () => {
//         setContactOpen(true)
//     }

//     return (
//         <>

//             {/* Main Content */}
//             <Box component="main" sx={{ flexGrow: 1 }}>
//                 {/* Hero Section */}
//                 <Box
//                     sx={{ bgcolor: "white", py: 8, textAlign: "center" }} >
//                     <Box sx={{ paddingBottom: '35px', paddingTop: '35px' }}>
//                         <Typography variant="h2" component="h1"
//                             sx={{
//                                 fontWeight: 700, mb: 2, alignItems: 'center',
//                                 color: "#333",
//                                 direction: "rtl",
//                             }}
//                         >
//                             עיצוב הזמנות מקצועי בקליק
//                         </Typography>
//                         <Typography variant="h5" sx={{ margin: '15px', color: "#666", direction: "rtl" }}>
//                             בחר תבנית, העלה קובץ, וקבל הזמנה מעוצבת בצורה מושלמת
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             size="large"
//                             onClick={() => navigate("/chooseCategory")}
//                             sx={{
//                                 bgcolor: "var(--primary-color)",
//                                 "&:hover": { bgcolor: "#e05e52" },
//                                 px: 4,
//                                 py: 1.5,
//                                 borderRadius: 2,
//                                 fontSize: "1.1rem",
//                             }}
//                         >
//                             התחל עכשיו
//                         </Button>
//                     </Box>
//                 </Box>

//                 {/* Features Section */}
//                 <Box sx={{ py: 8/*, width: "100%" */ }}>
//                     <Box>
//                         <Typography
//                             variant="h3"
//                             component="h2"
//                             sx={{
//                                 fontWeight: 700,
//                                 mb: 6,
//                                 textAlign: "center",
//                                 color: "#333",
//                                 direction: "rtl",
//                             }}
//                         >
//                             למה לבחור בנו?
//                         </Typography>

//                         <Grid container spacing={4} direction="row-reverse">
//                             <Grid item xs={12} md={4}>
//                                 <Card
//                                     sx={{
//                                         height: "100%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         borderRadius: 3,
//                                         boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                                         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                                         "&:hover": {
//                                             transform: "translateY(-10px)",
//                                             boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                                         },
//                                     }}
//                                 >
//                                     <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
//                                         <Box
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent: "center",
//                                                 mb: 2,
//                                             }}
//                                         >
//                                             <Avatar
//                                                 sx={{
//                                                     bgcolor: "var(--primary-color)",
//                                                     width: 70,
//                                                     height: 70,
//                                                 }}
//                                             >
//                                                 <FaEnvelope size={30} color="#fff" />
//                                             </Avatar>
//                                         </Box>
//                                         <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
//                                             עיצוב מקצועי
//                                         </Typography>
//                                         <Typography variant="body1" color="text.secondary">
//                                             מגוון רחב של תבניות מעוצבות על ידי מעצבים מקצועיים, המתאימות לכל סוג של אירוע ולכל סגנון.
//                                         </Typography>
//                                     </CardContent>
//                                     <CardActions sx={{ justifyContent: "center", pb: 3 }}>
//                                         <Button
//                                             size="small"
//                                             onClick={() => navigate("/chooseCategory")}
//                                             sx={{
//                                                 color: "var(--primary-color)",
//                                                 "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
//                                             }}
//                                         >
//                                             צפה בתבניות
//                                         </Button>
//                                     </CardActions>
//                                 </Card>
//                             </Grid>

//                             <Grid item xs={12} md={4}>
//                                 <Card
//                                     sx={{
//                                         height: "100%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         borderRadius: 3,
//                                         boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                                         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                                         "&:hover": {
//                                             transform: "translateY(-10px)",
//                                             boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                                         },
//                                     }}
//                                 >
//                                     <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
//                                         <Box sx={{ display: "flex", justifyContent: "center", mb: 2, }} >
//                                             <Avatar sx={{ bgcolor: "var(--primary-color)", width: 70, height: 70, }}>
//                                                 <FaEnvelope size={30} color="#fff" />
//                                             </Avatar>
//                                         </Box>
//                                         <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
//                                             מהיר וקל לשימוש
//                                         </Typography>
//                                         <Typography variant="body1" color="text.secondary">
//                                             תהליך פשוט ומהיר שמאפשר לך ליצור הזמנה מושלמת תוך דקות ספורות, ללא צורך בידע מקצועי בעיצוב.
//                                         </Typography>
//                                     </CardContent>
//                                     <CardActions sx={{ justifyContent: "center", pb: 3 }}>
//                                         <Button
//                                             size="small"
//                                             onClick={() => navigate("/chooseCategory")}
//                                             sx={{
//                                                 color: "var(--primary-color)",
//                                                 "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
//                                             }}
//                                         >
//                                             איך זה עובד
//                                         </Button>
//                                     </CardActions>
//                                 </Card>
//                             </Grid>

//                             <Grid item xs={12} md={4}>
//                                 <Card
//                                     sx={{
//                                         height: "100%",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         borderRadius: 3,
//                                         boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                                         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                                         "&:hover": {
//                                             transform: "translateY(-10px)",
//                                             boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                                         },
//                                     }}
//                                 >
//                                     <CardContent sx={{ flexGrow: 1, textAlign: "center", direction: "rtl" }}>
//                                         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//                                             <Avatar sx={{ bgcolor: "var(--primary-color)", width: 70, height: 70, }}>
//                                                 <FaEnvelope size={30} color="#fff" />
//                                             </Avatar>
//                                         </Box>
//                                         <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
//                                             התאמה אישית
//                                         </Typography>
//                                         <Typography variant="body1" color="text.secondary">
//                                             אפשרות להתאים את ההזמנה לצרכים האישיים שלך, כולל צבעים, גופנים, תמונות ועוד, כדי ליצור הזמנה
//                                             ייחודית.
//                                         </Typography>
//                                     </CardContent>
//                                     <CardActions sx={{ justifyContent: "center", pb: 3 }}>
//                                         <Button size="small" onClick={() => navigate("/chooseCategory")} sx={{
//                                             color: "var(--primary-color)",
//                                             "&:hover": { bgcolor: "rgba(255,111,97,0.1)" },
//                                         }}>
//                                             אפשרויות התאמה
//                                         </Button>
//                                     </CardActions>
//                                 </Card>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>

//                 {/* Call to Action */}
//                 <Box
//                     sx={{ bgcolor: "var(--primary-color)", color: "white", py: 8, textAlign: "center" }}>
//                     <Box >
//                         <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3, direction: "rtl", }}>
//                             מוכנים להתחיל?
//                         </Typography>
//                         <Typography
//                             variant="h6"
//                             sx={{ mb: 4, direction: "rtl" }}>
//                             צור הזמנה מרשימה בקלות ובמהירות, או צור קשר אם יש לך שאלות
//                         </Typography>
//                         <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
//                             <Button variant="contained" size="large" onClick={() => navigate("/chooseCategory")}
//                                 sx={{ bgcolor: "white", color: "var(--primary-color)", "&:hover": { bgcolor: "#f0f0f0" }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
//                                 צור הזמנה
//                             </Button>
//                             <Button variant="outlined" size="large" onClick={handleContactOpen}
//                                 sx={{ borderColor: "white", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white", }, px: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem" }}>
//                                 צור קשר
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </>
//     )
// }







import  { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Clock, 
  PenTool, 
  Smartphone, 
  Image, 
  Send, 
  Award, 
  Heart,
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

export default() => {
  const navigate = useNavigate();
  const templateSectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll animation for template cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const templates = document.querySelectorAll(".template-card");
    templates.forEach((template) => {
      observer.observe(template);
    });

    return () => {
      templates.forEach((template) => {
        observer.unobserve(template);
      });
    };
  }, []);

  const scrollToTemplates = () => {
    templateSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--primary-light)] via-[var(--primary-color)] to-[var(--primary-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1567225591450-06036b3392a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] opacity-10 bg-center bg-cover"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block">עיצוב</span>{" "}
              <span className="inline-block">הזמנות</span>{" "}
              <span className="inline-block">מרהיבות</span>{" "}
              <span className="inline-block">בקליק</span>
              <motion.span 
                className="inline-block ml-2"
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Sparkles className="h-8 w-8 inline text-[var(--accent-color)]" />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              בחר תבנית, התאם אישית, וצור הזמנות מעוצבות בקלות ובמהירות לכל אירוע
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button 
                onClick={() => navigate(("/chooseCategory"))}
                className="bg-[var(--accent-color)] hover:bg-[var(--accent-dark)] text-white py-3 px-8 rounded-full font-medium text-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                התחל עכשיו
              </button>
              <button 
                onClick={scrollToTemplates}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-8 rounded-full font-medium text-lg border border-white/40 transform transition-all hover:scale-105"
              >
                צפה בתבניות
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] text-white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)]">איך זה עובד?</h2>
            <div className="w-24 h-1 bg-[var(--accent-color)] mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              תהליך פשוט בשלושה צעדים שיאפשר לך ליצור הזמנה מושלמת
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="relative bg-[var(--light-bg)] rounded-2xl p-6 shadow-sm text-center"
              whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center shadow-lg">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">1. בחר תבנית</h3>
                <p className="text-gray-600">
                  בחר מתוך מגוון רחב של תבניות מעוצבות המותאמות לכל סוגי האירועים
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative bg-[var(--light-bg)] rounded-2xl p-6 shadow-sm text-center"
              whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-color)] flex items-center justify-center shadow-lg">
                  <Image className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">2. התאם אישית</h3>
                <p className="text-gray-600">
                  ערוך את הטקסט, שנה צבעים והוסף תמונות אישיות להתאמה מושלמת
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative bg-[var(--light-bg)] rounded-2xl p-6 shadow-sm text-center"
              whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-dark)] flex items-center justify-center shadow-lg">
                  <Send className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">3. שתף ושלח</h3>
                <p className="text-gray-600">
                  הורד את ההזמנה המוכנה ושתף אותה דרך ווטסאפ, מייל או הדפס אותה
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section ref={templateSectionRef} className="py-16 bg-[var(--light-bg)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)]">תבניות מובילות</h2>
            <div className="w-24 h-1 bg-[var(--accent-color)] mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              מבחר תבניות איכותיות ומעוצבות לבחירתך
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "חתונה אלגנטית",
                image: "https://images.unsplash.com/photo-1509610973147-232dfea52a97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                delay: 0
              },
              {
                title: "יום הולדת צבעוני",
                image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                delay: 0.1
              },
              {
                title: "בר/בת מצווה",
                image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                delay: 0.2
              }
            ].map((template, index) => (
              <div 
                key={index}
                className="template-card opacity-0 transition-all duration-700 transform translate-y-12"
                style={{ transitionDelay: `${template.delay}s` }}
              >
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[var(--text-color)]">{template.title}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[var(--primary-color)] font-medium">צפה בתבנית</span>
                      <button 
                        onClick={() => navigate(("/chooseCategory"))}
                        className="text-[var(--accent-color)] hover:text-[var(--accent-dark)]"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button 
              onClick={() => navigate(("/chooseCategory"))}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white py-3 px-8 rounded-full font-medium transition-all hover:shadow-lg"
            >
              צפה בכל התבניות
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)]">למה לבחור בנו?</h2>
            <div className="w-24 h-1 bg-[var(--accent-color)] mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              פלטפורמה מתקדמת עם כל מה שנדרש ליצירת הזמנות מושלמות
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "עיצוב מקצועי",
                description: "תבניות מעוצבות בקפידה על ידי מעצבים מקצועיים"
              },
              {
                icon: Clock,
                title: "חיסכון בזמן",
                description: "יצירת הזמנה מושלמת תוך דקות ספורות"
              },
              {
                icon: Heart,
                title: "התאמה אישית",
                description: "שליטה מלאה בצבעים, גופנים ופריסת התוכן"
              },
              {
                icon: Smartphone,
                title: "תצוגה מותאמת",
                description: "הזמנות שנראות מצוין בכל מכשיר ופלטפורמה"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-[var(--light-bg)]"
                whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-color)] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              צור הזמנה מרשימה בקלות ובמהירות, והפוך כל אירוע לבלתי נשכח
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate(("/chooseCategory"))}
                className="bg-white text-[var(--primary-color)] hover:bg-gray-100 py-3 px-8 rounded-full font-medium text-lg shadow-lg transform transition-all hover:scale-105"
              >
                צור הזמנה עכשיו
              </button>
              <button 
                onClick={() => navigate(("/Contact"))}
                className="bg-transparent hover:bg-white/10 text-white py-3 px-8 rounded-full font-medium text-lg border-2 border-white transform transition-all hover:scale-105"
              >
                צור קשר
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add custom CSS for scroll animations */}
      <style jsx={true}>{`
        .template-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}