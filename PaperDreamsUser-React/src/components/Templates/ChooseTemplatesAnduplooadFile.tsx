// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   Container,
//   CircularProgress,
//   Alert,
//   useTheme,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { Template } from "../../models/Template";
// import UploadFile from "../UploadFile";
// import ShowTemplate from "./ShowTemplate";
// import ProcessingInvitation from "../ProcessingInvitation";
// import { Invitation } from "../../models/invitation";
// import { useDispatch } from "react-redux";
// import { setInvitation } from "../../redux/InvitationSlice";
// import { AppDispatch } from "../../redux/Store";
// import { getText } from "../../Services/FileService";

// export default function CategoryTemplatesPage() {
//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [waitToExtract, setWaitToExtract] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         setLoading(true);
//         const category = JSON.parse(sessionStorage.getItem("category") || "{}");

//         if (!category.id) {
//           setError("לא נבחרה קטגוריה. אנא בחר קטגוריה תחילה.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/templates/category/${category.id}`,
//           {
//             headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` },
//           }
//         );

//         setTemplates(res.data);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//         setError("אירעה שגיאה בטעינת התבניות. אנא נסה שוב מאוחר יותר.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   const handleCreateInvitation = () => {
//     if (!file || !selectedTemplate) return;
//     sessionStorage.setItem("template", JSON.stringify(selectedTemplate));

//     setWaitToExtract(true);
//     console.log("in handleCreateInvitation before getText");
    
//     getText(file)
//       .then((texts) => {
//         const invitation: Invitation = { text: texts, template: selectedTemplate };
//         console.log("in handleCreateInvitation after getText");
//         console.log("texts");
//         console.log(texts);
//         console.log("------------------");
//         dispatch(setInvitation({ invitation }));
//         setWaitToExtract(false);
//         navigate("/designInvitation");
//       })
//       .catch((error) => {
//         console.error("Error processing file text:", error);
//         setWaitToExtract(false);
//       });
//   };

//   return (
//     <Container maxWidth="xl" sx={{ overflowX: "hidden", pb: 5 }}>
//       {error && (
//         <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ py: 4 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "nowrap",
//             flexDirection: "row-reverse",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//           }}
//         >
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               fontWeight: 700,
//               textAlign: "center",
//               direction: "rtl",
//               // color: theme.palette.primary.main,
//             }}
//           >
//             בחירת תבנית והעלאת קובץ
//           </Typography>
//           <Button
//             variant="contained"
//             disabled={!file || !selectedTemplate}
//             onClick={handleCreateInvitation}
//             sx={{
//               bgcolor: theme.palette.primary.main,
//               "&:hover": { bgcolor: theme.palette.primary.dark },
//               px: 6,
//               borderRadius: 2,
//               fontSize: "1.1rem",
//               boxShadow: theme.shadows[4],
//             }}
//           >
//             המשך ליצירת ההזמנה
//           </Button>
//         </Box>

//         <Grid container spacing={4} sx={{ direction: "rtl" }}>
//           <Grid item xs={12} md={3}>
//             <Paper
//               elevation={3}
//               sx={{
//                 height: "500px",
//                 p: 4,
//                 borderRadius: 3,
//                 direction: "rtl",
//                 border: `1px solid ${theme.palette.primary.light}`,
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.dark }}>
//                 העלאת קובץ
//               </Typography>
//               <Typography sx={{ fontWeight: 300, mb: 3, color: theme.palette.primary.dark }}>
//                  העלה קובץ עם פרטים על האירוע
//               </Typography>
//               <UploadFile onFileSelected={setFile} />
//               <Box sx={{ mt: 4 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   * ניתן להעלות קבצי תמונה (JPG, PNG), PDF או מסמכי Word
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   * גודל קובץ מקסימלי: 10MB
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={9}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 direction: "rtl",
//                 border: `1px solid ${theme.palette.primary.light}`,
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
//                 בחירת תבנית
//               </Typography>

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//                   <CircularProgress color="primary" />
//                 </Box>
//               ) : templates.length > 0 ? (
//                 <Grid container spacing={3}>
//                   {templates.map((template, index) => (
//                     <Grid item xs={12} sm={6} md={3} key={index}>
//                       <Box
//                         onClick={() => setSelectedTemplate(template)}
//                         sx={{
//                           cursor: "pointer",
//                           transition: "transform 0.2s",
//                           "&:hover": { transform: "scale(1.05)" },
//                           border:
//                             selectedTemplate?.id === template.id
//                               ? `3px solid ${theme.palette.primary.main}`
//                               : "3px solid transparent",
//                           borderRadius: 3,
//                           p: 1,
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           height: "100%",
//                           boxShadow:
//                             selectedTemplate?.id === template.id ? theme.shadows[6] : theme.shadows[1],
//                           backgroundColor:
//                             selectedTemplate?.id === template.id
//                               ? theme.palette.action.selected
//                               : "transparent",
//                         }}
//                       >
//                         <ShowTemplate fileName={template.name} />
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               ) : (
//                 <Typography variant="h6" align="center" sx={{ py: 4 }}>
//                   אין תבניות זמינות בקטגוריה זו
//                 </Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//       {waitToExtract && <ProcessingInvitation />}
//     </Container>
//   );
// }




// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   Container,
//   CircularProgress,
//   Alert,
//   useTheme,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { Template } from "../../models/Template";
// import UploadFile from "../UploadFile";
// import ShowTemplate from "./ShowTemplate";
// import ProcessingInvitation from "../ProcessingInvitation";
// import { Invitation } from "../../models/invitation";
// import { useDispatch } from "react-redux";
// import { setInvitation } from "../../redux/InvitationSlice";
// import { AppDispatch } from "../../redux/Store";
// import { getText } from "../../Services/FileService";

// export default function CategoryTemplatesPage() {
//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [waitToExtract, setWaitToExtract] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         setLoading(true);
//         const category = JSON.parse(sessionStorage.getItem("category") || "{}");

//         if (!category.id) {
//           setError("לא נבחרה קטגוריה. אנא בחר קטגוריה תחילה.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/templates/category/${category.id}`,
//           {
//             headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` },
//           }
//         );

//         setTemplates(res.data);
//       } catch (error) {
//         console.error("Error fetching templates:", error);
//         setError("אירעה שגיאה בטעינת התבניות. אנא נסה שוב מאוחר יותר.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplates();
//   }, []);

//   const handleCreateInvitation = () => {
//     if (!file || !selectedTemplate) return;
//     sessionStorage.setItem("template", JSON.stringify(selectedTemplate));

//     setWaitToExtract(true);

//     getText(file)
//       .then((texts) => {
//         const invitation: Invitation = { text: texts, template: selectedTemplate };
//         dispatch(setInvitation({ invitation }));
//         setWaitToExtract(false);
//         navigate("/designInvitation");
//       })
//       .catch((error) => {
//         console.error("Error processing file text:", error);
//         setWaitToExtract(false);
//       });
//   };

//   return (
//     <Container sx={{ pb: 5, direction: "rtl" }}>
//       {error && (
//         <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ py: 4 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//           }}
//         >
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               fontWeight: 700,
//               textAlign: "center",
//             }}
//           >
//             בחירת תבנית והעלאת קובץ
//           </Typography>
//           <Button
//             variant="contained"
//             disabled={!file || !selectedTemplate}
//             onClick={handleCreateInvitation}
//             sx={{
//               bgcolor: theme.palette.primary.main,
//               "&:hover": { bgcolor: theme.palette.primary.dark },
//               px: 6,
//               borderRadius: 2,
//               fontSize: "1.1rem",
//               boxShadow: theme.shadows[4],
//             }}
//           >
//             המשך ליצירת ההזמנה
//           </Button>
//         </Box>

//         <Grid container spacing={4}>
//           {/* העלאת קובץ בצד ימין */}
//           <Grid item xs={12} md={3}>
//             <Paper
//               elevation={3}
//               sx={{
//                 height: "100%",
//                 p: 4,
//                 borderRadius: 3,
//                 direction: "rtl",
//                 border: `1px solid ${theme.palette.primary.light}`,
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}>
//                 העלאת קובץ
//               </Typography>
//               <Typography sx={{ fontWeight: 300, mb: 3, color: theme.palette.primary.main }}>
//                 העלה קובץ עם פרטים על האירוע
//               </Typography>
//               <UploadFile onFileSelected={setFile} />
//               <Box sx={{ mt: 4 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   * ניתן להעלות קבצי תמונה (JPG, PNG), PDF או מסמכי Word
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   * גודל קובץ מקסימלי: 10MB
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>

//           {/* תבניות בגלילה אופקית ברקע אפור */}
//           <Grid item xs={12} md={9}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 direction: "rtl",
//                 border: `1px solid ${theme.palette.primary.light}`,
//                 bgcolor: "#f4f4f4",
//                 minHeight: 500,
//               }}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
//                 בחירת תבנית
//               </Typography>

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//                   <CircularProgress color="primary" />
//                 </Box>
//               ) : templates.length > 0 ? (
//                 <Box
//                   sx={{
//                     overflowX: "auto",
//                     whiteSpace: "nowrap",
//                     pb: 1,
//                     "&::-webkit-scrollbar": {
//                       height: "8px",
//                     },
//                     "&::-webkit-scrollbar-thumb": {
//                       backgroundColor: "#ccc",
//                       borderRadius: "4px",
//                     },
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       gap: 2,
//                       flexWrap: "nowrap",
//                     }}
//                   >
//                     {templates.map((template, index) => (
//                       <Box
//                         key={index}
//                         onClick={() => setSelectedTemplate(template)}
//                         sx={{
//                           cursor: "pointer",
//                           transition: "transform 0.2s",
//                           flex: "0 0 auto",
//                           width: 200,
//                           height: 280,
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           p: 1,
//                           border:
//                             selectedTemplate?.id === template.id
//                               ? `3px solid ${theme.palette.primary.main}`
//                               : "3px solid transparent",
//                           borderRadius: 3,
//                           boxShadow:
//                             selectedTemplate?.id === template.id
//                               ? theme.shadows[6]
//                               : theme.shadows[1],
//                           backgroundColor:
//                             selectedTemplate?.id === template.id
//                               ? theme.palette.action.selected
//                               : "#fff",
//                           "&:hover": { transform: "scale(1.05)" },
//                         }}
//                       >
//                         <ShowTemplate fileName={template.name} />
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               ) : (
//                 <Typography variant="h6" align="center" sx={{ py: 4 }}>
//                   אין תבניות זמינות בקטגוריה זו
//                 </Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//       {waitToExtract && <ProcessingInvitation />}
//     </Container>
//   );
// }




import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { Template } from "../../models/Template";
import UploadFile from "../UploadFile";
import ShowTemplate from "./ShowTemplate";
import ProcessingInvitation from "../ProcessingInvitation";
import { Invitation } from "../../models/invitation";
import { useDispatch } from "react-redux";
import { setInvitation } from "../../redux/InvitationSlice";
import { AppDispatch } from "../../redux/Store";
import { getText } from "../../Services/FileService";

export default function CategoryTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [waitToExtract, setWaitToExtract] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const category = JSON.parse(sessionStorage.getItem("category") || "{}");

        if (!category.id) {
          setError("לא נבחרה קטגוריה. אנא בחר קטגוריה תחילה.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/templates/category/${category.id}`,
          {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` },
          }
        );

        setTemplates(res.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError("אירעה שגיאה בטעינת התבניות. אנא נסה שוב מאוחר יותר.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleCreateInvitation = () => {
    if (!file || !selectedTemplate) return;
    sessionStorage.setItem("template", JSON.stringify(selectedTemplate));

    setWaitToExtract(true);

    getText(file)
      .then((texts) => {
        const invitation: Invitation = { text: texts, template: selectedTemplate };
        dispatch(setInvitation({ invitation }));
        setWaitToExtract(false);
        navigate("/designInvitation");
      })
      .catch((error) => {
        console.error("Error processing file text:", error);
        setWaitToExtract(false);
      });
  };

  return (
    <Box
    sx={{
      width: "100vw", // חוסם קפיצה
      minHeight: "100vh",
      direction: "rtl",
      pb: 5,
      px: { xs: 2, md: 6 },
      overflowX: "hidden", // מונע גלילה לא רצויה
    }}
  >
  
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            direction: "ltr",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            בחירת תבנית והעלאת קובץ
          </Typography>
          <Button
            variant="contained"
            disabled={!file || !selectedTemplate}
            onClick={handleCreateInvitation}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primary.main },
              px: 6,
              borderRadius: 2,
              fontSize: "1.1rem",
              boxShadow: theme.shadows[4],
            }}
          >
            המשך ליצירת ההזמנה
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* אזור העלאת קובץ */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                direction: "rtl",
                border: `1px solid ${theme.palette.primary.light}`,
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}>
                העלאת קובץ
              </Typography>
              <Typography sx={{ fontWeight: 300, mb: 3, color: theme.palette.primary.main }}>
                העלה קובץ עם פרטים על האירוע
              </Typography>
              <UploadFile onFileSelected={setFile} />
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  * ניתן להעלות קבצי תמונה (JPG, PNG), PDF או מסמכי Word
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  * גודל קובץ מקסימלי: 10MB
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* תבניות עם גלילה אנכית */}
          <Grid item xs={12} md={9}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                direction: "rtl",
                border: `1px solid ${theme.palette.primary.light}`,
                bgcolor: "#f4f4f4",
                minHeight: 500,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                בחירת תבנית
              </Typography>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : templates.length > 0 ? (
                <Grid container spacing={3}>
                  {templates.map((template, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Box
                        onClick={() => setSelectedTemplate(template)}
                        sx={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          "&:hover": { transform: "scale(1.05)" },
                          border:
                            selectedTemplate?.id === template.id
                              ? `3px solid ${theme.palette.primary.main}`
                              : "3px solid transparent",
                          borderRadius: 3,
                          p: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow:
                            selectedTemplate?.id === template.id
                              ? theme.shadows[6]
                              : theme.shadows[1],
                          backgroundColor:
                            selectedTemplate?.id === template.id
                              ? theme.palette.action.selected
                              : "#fff",
                        }}
                      >
                        <ShowTemplate fileName={template.name} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="h6" align="center" sx={{ py: 4 }}>
                  אין תבניות זמינות בקטגוריה זו
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {waitToExtract && <ProcessingInvitation />}
    </Box>
  );
}
