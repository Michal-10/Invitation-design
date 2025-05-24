// // import { useEffect, useRef, useState } from "react";
// // import { fabric } from "fabric";
// // import axios from "axios";
// // import { Template } from "../../models/Template";
// // import { useNavigate } from "react-router";
// // import { RootState } from "../../redux/Store";
// // import { useSelector } from "react-redux";
// // import { Grid, Box, Button, useTheme } from "@mui/material";
// // import PrintIcon from "@mui/icons-material/Print";
// // import SaveIcon from "@mui/icons-material/Save";
// // import { getDownloadURL } from "../../Services/FileService";
// // import { uploadFileToAWS } from "../../Services/UploadFileToAWS";
// // import TextEditorSidebar from "./TextEditorSideBar";
// // import { decodeToken } from "../../Services/User";

// // export default () => {
// //     const theme = useTheme();

// //     const canvasRef = useRef<HTMLCanvasElement | null>(null);
// //     const [canvas, setCanvas] = useState<fabric.Canvas>({} as fabric.Canvas);
// //     const [imageURL, setImageURL] = useState<string>("");

// //     const state = useSelector((state: RootState) => state.invitation.Invitation);
// //     const [myTtemplate, setMyTemplate] = useState<Template>({} as Template);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const storedTemplate = JSON.parse(sessionStorage.getItem("template") || '{}');
// //         setMyTemplate(storedTemplate);

// //         const fetchFileUrl = async () => {
// //             try {
// //                 setImageURL(await getDownloadURL(storedTemplate.name));
// //             } catch (error) {
// //                 console.error("שגיאה בהבאת ה-URL:", error);
// //                 alert(`שגיאה בהבאת ה-URL: ${error}`);
// //             }
// //         };
// //         fetchFileUrl();
// //     }, []);

// //     useEffect(() => {
// //         if (!canvasRef.current) return;
// //         const newCanvas = new fabric.Canvas(canvasRef.current, { backgroundColor: "" });
// //         setCanvas(newCanvas);
// //         return () => {
// //             newCanvas.dispose();
// //         };
// //     }, []);

// //     useEffect(() => {
// //         if (!canvas || !imageURL) return;

// //         const imgElement = new Image();
// //         imgElement.crossOrigin = "Anonymous";
// //         imgElement.src = imageURL;

// //         imgElement.onload = () => {
// //             const originalWidth = imgElement.width;
// //             const originalHeight = imgElement.height;

// //             const maxWidth = 550;
// //             const maxHeight = 657;

// //             const scaleFactor = Math.min(maxWidth / originalWidth, maxHeight / originalHeight, 1);
// //             const finalWidth = originalWidth * scaleFactor;
// //             const finalHeight = originalHeight * scaleFactor;

// //             canvas.setWidth(finalWidth);
// //             canvas.setHeight(finalHeight);

// //             const fabricImg = new fabric.Image(imgElement, {
// //                 selectable: false,
// //                 originX: "left",
// //                 originY: "top",
// //             });

// //             fabricImg.set({ scaleX: scaleFactor, scaleY: scaleFactor });

// //             canvas.setBackgroundImage(fabricImg, () => {
// //                 canvas.renderAll();
// //                 addTextToCanvas(scaleFactor);
// //             });
// //         };
// //     }, [canvas, imageURL]);

// //     const addTextToCanvas = (scaleFactor: number) => {
// //         let exaText1 = state.text;
// //         let exaText = Object.entries(exaText1);

// //         if (!canvas || !myTtemplate?.templateFields) return;

// //         myTtemplate.templateFields.forEach((field) => {
// //             const matchingEntry = exaText.find(([key]) => key === field.field.name);
// //             const matchingText = matchingEntry ? matchingEntry[1] : undefined;

// //             if (matchingText) {
// //                 const value = matchingText as string;
// //                 const xPos = field.x || 0;
// //                 const yPos = field.y || 0;

// //                 const textObj = new fabric.Text(value, {
// //                     left: xPos,
// //                     top: yPos,
// //                     fontSize: 50 * scaleFactor,
// //                     fill: theme.palette.text.primary,
// //                     fontWeight: "bold",
// //                     fontFamily: theme.typography.fontFamily,
// //                 });
// //                 (textObj as any).fieldName = field.field.name;

// //                 canvas.add(textObj);
// //             }
// //         });

// //         canvas.renderAll();
// //     };

// //     const handleSaveAndDownload = async () => {
// //         if (!canvas) return;

// //         const dataUrl = canvas.toDataURL({ format: "png" });

// //         const blob = await (await fetch(dataUrl)).blob();
// //         const timestamp = new Date().getTime();
// //         const newFile = new File([blob], `invitation_${timestamp}.png`, { type: "image/png" });

// //         try {
// //             const response = await axios.get(
// //                 `${import.meta.env.VITE_API_URL}/upload/presigned-url?fileName=${newFile.name}`
// //             );

// //             const fileUrl = response.data;

// //             const invitationData = {
// //                 category: JSON.parse(sessionStorage.getItem("category") || '')?.id,
// //                 name: newFile.name,
// //                 imageUrl: fileUrl,
// //                 userId: decodeToken()?.decoded.userId,
// //                 templateId: myTtemplate.id,
// //                 content: "הזמנה מושלמת",
// //             };

// //             await axios.post(`${import.meta.env.VITE_API_URL}/CompletedInvitation/add`, invitationData);

// //             await uploadFileToAWS(newFile);

// //             const link = document.createElement("a");
// //             link.href = dataUrl;
// //             link.download = "invitation.png";
// //             document.body.appendChild(link);
// //             link.click();
// //             document.body.removeChild(link);

// //             sessionStorage.removeItem("category");
// //             sessionStorage.removeItem("template");
// //             navigate('/');
// //         } catch (error) {
// //             console.error("Error saving invitation:", error);
// //             alert("שגיאה בשמירת ההזמנה.");
// //         }
// //     };

// //     const handlePrint = () => {
// //         if (!canvas) return;

// //         canvas.renderAll();

// //         setTimeout(() => {
// //             const dataUrl = canvas.toDataURL({ format: "png" });

// //             const printFrame = document.createElement("iframe");
// //             printFrame.style.position = "absolute";
// //             printFrame.style.width = "0px";
// //             printFrame.style.height = "0px";
// //             printFrame.style.border = "none";
// //             document.body.appendChild(printFrame);

// //             const doc = printFrame.contentWindow?.document;
// //             if (doc) {
// //                 doc.open();
// //                 doc.write(`
// //                 <html>
// //                 <head>
// //                     <title>Print Invitation</title>
// //                     <style>
// //                         @page { size: A4 portrait; margin: 0; }
// //                         body { margin: 0; padding: 0; width: 100%; height: 100%; }
// //                         img { width: 100%; height: 100%; object-fit: cover; }
// //                     </style>
// //                 </head>
// //                 <body onload="window.print(); setTimeout(() => window.parent.document.body.removeChild(window.frameElement), 1000);">
// //                     <img src="${dataUrl}" />
// //                 </body>
// //                 </html>
// //             `);
// //                 doc.close();
// //             }
// //         }, 100);
// //     };

// //     return (
// //         <Grid container sx={{ height: "100vh", direction: "rtl", bgcolor: theme.palette.background.default }}>
// //             {/* Sidebar - רבע עמוד */}
// //             <Grid item xs={12} md={3} sx={{ p: 1, borderRight: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
// //                 <TextEditorSidebar canvas={canvas} fieldsWithPlaces={myTtemplate.templateFields || []} />
// //             </Grid>

// //             {/* Canvas - שלושת רבעי עמוד */}
// //             <Grid
// //                 item
// //                 xs={12}
// //                 md={9}
// //                 sx={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     alignItems: "center",
// //                     position: "relative",
// //                     bgcolor: theme.palette.background.paper,
// //                     p: 2,
// //                 }}
// //             >
// //                 <canvas
// //                     ref={canvasRef}
// //                     style={{
// //                         width: "100%",
// //                         maxWidth: 600,
// //                         paddingTop: theme.spacing(10),
// //                         borderRadius: theme.shape.borderRadius,
// //                         boxShadow: theme.shadows[3],
// //                         backgroundColor: theme.palette.grey[100],
// //                     }}
// //                 />

// //                 <Box
// //                     sx={{
// //                         position: "absolute",
// //                         top: theme.spacing(10),
// //                         left: theme.spacing(3),
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: 2,
// //                     }}
// //                 >
// //                     <Button
// //                         startIcon={<SaveIcon />}
// //                         variant="outlined"
// //                         color="primary"
// //                         onClick={handleSaveAndDownload}
// //                         sx={{
// //                             fontSize: "1.1rem",
// //                             gap: 1.5,
// //                             borderWidth: 2,
// //                             borderColor: theme.palette.primary.main,
// //                             color: theme.palette.primary.main,
// //                             "&:hover": {
// //                                 bgcolor: theme.palette.primary.light,
// //                                 borderColor: theme.palette.primary.dark,
// //                             },
// //                         }}
// //                     >
// //                         לשמירה והורדה
// //                     </Button>
// //                     <Button
// //                         startIcon={<PrintIcon />}
// //                         variant="outlined"
// //                         color="primary"
// //                         onClick={handlePrint}
// //                         sx={{
// //                             fontSize:"1.1rem",
// //                             gap: 1.5,
// //                             borderWidth: 2,
// //                             borderColor: theme.palette.primary.main,
// //                             color: theme.palette.primary.main,
// //                             "&:hover": {
// //                                 bgcolor: theme.palette.primary.light,
// //                                 borderColor: theme.palette.primary.dark,
// //                             },
// //                         }}
// //                     >
// //                         להדפסה
// //                     </Button>
// //                 </Box>
// //             </Grid>
// //         </Grid>
// //     );
// // };







// import { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import axios from "axios";
// import { Template } from "../../models/Template";
// import { useNavigate } from "react-router";
// import { RootState } from "../../redux/Store";
// import { useSelector } from "react-redux";
// import { Grid, Box, Button } from "@mui/material";
// import PrintIcon from "@mui/icons-material/Print";
// import SaveIcon from "@mui/icons-material/Save";
// import { getDownloadURL } from "../../Services/FileService";
// import { uploadFileToAWS } from "../../Services/UploadFileToAWS";
// import { decodeToken } from "../../Services/User";
// import TextEditorSidebar from "./TextEditorSideBar";

// export default () => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [canvas, setCanvas] = useState<fabric.Canvas>({} as fabric.Canvas);
//     const [imageURL, setImageURL] = useState<string>("");

//     const state = useSelector((state: RootState) => state.invitation.Invitation);
//     const [myTtemplate, setMyTemplate] = useState<Template>({} as Template);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedTemplate = JSON.parse(sessionStorage.getItem("template") || '{}');
//         console.log(storedTemplate);

//         setMyTemplate(storedTemplate);
//         console.log(myTtemplate);

//         const fetchFileUrl = async () => {

//             console.log(myTtemplate?.name);
//             console.log("myTtemplate?.name");

//             try {
//                 console.log("///////////////////////////////////////////////");
//                 console.log(storedTemplate.name);
//                 setImageURL(await getDownloadURL(storedTemplate.name));
//                 console.log("imageURL", imageURL);

//             } catch (error) {
//                 console.error("שגיאה בהבאת ה-URL:", error);
//                 alert(`שגיאה בהבאת ה-URL: ${error}`);
//             }
//         };
//         fetchFileUrl();
//     }, []);

//     useEffect(() => {
//         if (!canvasRef.current) return;
//         const newCanvas = new fabric.Canvas(canvasRef.current, { backgroundColor: "" });
//         setCanvas(newCanvas);
//         return () => {
//             newCanvas.dispose();
//         };
//     }, []);

//     useEffect(() => {
//         if (!canvas || !imageURL) return;

//         const imgElement = new Image();
//         imgElement.crossOrigin = "Anonymous";
//         imgElement.src = imageURL;

//         imgElement.onload = () => {
//             const originalWidth = imgElement.width;
//             const originalHeight = imgElement.height;

//             const maxWidth = 550;
//             const maxHeight = 657;

//             const scaleFactor = Math.min(maxWidth / originalWidth, maxHeight / originalHeight, 1);
//             const finalWidth = originalWidth * scaleFactor;
//             const finalHeight = originalHeight * scaleFactor;

//             canvas.setWidth(finalWidth);
//             canvas.setHeight(finalHeight);

//             const fabricImg = new fabric.Image(imgElement, {
//                 selectable: false,
//                 originX: "left",
//                 originY: "top",
//             });

//             fabricImg.set({ scaleX: scaleFactor, scaleY: scaleFactor });

//             canvas.setBackgroundImage(fabricImg, () => {
//                 canvas.renderAll();
//                 addTextToCanvas(scaleFactor);
//             });
//         };
//     }, [canvas, imageURL]);

//     const addTextToCanvas = (scaleFactor: number) => {

//         console.log("myTtemplate.fields");
//         console.log(myTtemplate.templateFields);

//         let exaText1 = state.text;
//         console.log("exaText");
//         console.log(exaText1);
//         let exaText = Object.entries(exaText1);

//         console.log('here', exaText);

//         if (!canvas || !myTtemplate?.templateFields) return;
//         console.log(myTtemplate.templateFields);
//         console.log('template', myTtemplate);
// console.log('myTtemplate.templateFields', myTtemplate.templateFields);
// console.log(myTtemplate.templateFields[0].name);


//         myTtemplate.templateFields.forEach((field) => {
//             console.log("in myTtemplate.templateFields foreach");
//             console.log(field.field.name);
            
            
//             const matchingEntry = exaText.find(([key]) => key === field.field.name);
//             console.log("matchingEntry");
//             console.log(matchingEntry);
//             const matchingText = matchingEntry ? matchingEntry[1] : undefined;

//             if (matchingText) {
//                 const value = matchingText as string;
//                 const xPos = field.x || 0;
//                 const yPos = field.y || 0;

//                 const scaledX = xPos;
//                 const scaledY = yPos;

//                 const textObj = new fabric.Text(value, {
//                     left: scaledX,
//                     top: scaledY,
//                     fontSize: 25 * scaleFactor,
//                     fill: "black",
//                     fontWeight: "bold"
//                 });
//                 (textObj as any).fieldName = field.field.name;

//                 canvas.add(textObj);
//             }
//         });

//         canvas.renderAll();
//     };



//     const handleSaveAndDownload = async () => {
//         console.log("after setSave(true);");

//         if (!canvas) return;

//         const dataUrl = canvas.toDataURL({ format: "png" });
//         console.log('dataUrl', dataUrl);

//         const blob = await (await fetch(dataUrl)).blob();
//         const timestamp = new Date().getTime();
//         const newFile = new File([blob], `invitation_${timestamp}.png`, { type: "image/png" });
//         console.log("bsfore setFile;", newFile);

//         console.log("after setFile;");

//         try {

//             console.log("----------------------------------לפני שמירת מושלם");
//             console.log(newFile.name);

//             // בקשת URL חתום משרת ה-Backend

//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_URL}/upload/presigned-url?fileName=${newFile.name}`
//             );

//             console.log("after presigned-url", response);
//             console.log('response.data', response.data);

//             const fileUrl = response.data;

//             const invitationData = {
//                 category: JSON.parse(sessionStorage.getItem("category") || '')?.id,
//                 name: newFile.name,
//                 imageUrl: fileUrl,
//                 userId: decodeToken()?.decoded.userId,
//                 templateId: myTtemplate.id, //template.id,
//                 content: "הזמנה מושלמת",
//             };

//             console.log("לפני שמירת מושלם");
//             console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");

//             await axios.post(`${import.meta.env.VITE_API_URL}/CompletedInvitation/add`, invitationData);
//             console.log("אחרי שמירת מושלם");

//             // העלאת הקובץ ל-S3
//             await uploadFileToAWS(newFile);

//             // הורדת הקובץ
//             const link = document.createElement("a");
//             link.href = dataUrl;
//             link.download = "invitation.png";
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             sessionStorage.removeItem("category");
//             sessionStorage.removeItem("template");
//             navigate('/');

//         } catch (error) {
//             console.error("Error saving invitation:", error);
//             alert("שגיאה בשמירת ההזמנה.");
//         }
//     };


//     const handlePrint = () => {
//         if (!canvas) return;

//         canvas.renderAll();

//         setTimeout(() => {
//             const dataUrl = canvas.toDataURL({ format: "png" });

//             const printFrame = document.createElement("iframe");
//             printFrame.style.position = "absolute";
//             printFrame.style.width = "0px";
//             printFrame.style.height = "0px";
//             printFrame.style.border = "none";
//             document.body.appendChild(printFrame);

//             const doc = printFrame.contentWindow?.document;
//             if (doc) {
//                 doc.open();
//                 doc.write(`
//                 <html>
//                 <head>
//                     <title>Print Invitation</title>
//                     <style>
//                         @page { size: A4 portrait; margin: 0; }
//                         body { margin: 0; padding: 0; width: 100%; height: 100%; }
//                         img { width: 100%; height: 100%; object-fit: cover; }
//                     </style>
//                 </head>
//                 <body onload="window.print(); setTimeout(() => window.parent.document.body.removeChild(window.frameElement), 1000);">
//                     <img src="${dataUrl}" />
//                 </body>
//                 </html>
//             `);
//                 doc.close();
//             }
//         }, 100);
//     };

//     return (
//         <>
//             <Grid container style={{ height: "90vh", direction: "rtl" }}>
//                 {/* Sidebar - רבע עמוד */}

//                 <Grid item xs={3} style={{ padding: "3px" }}>
//                     <TextEditorSidebar canvas={canvas} fieldsWithPlaces={myTtemplate.templateFields || []} />
//                 </Grid>
//                 {/* Canvas - שלושת רבעי עמוד */}
//                 <Grid item xs={9} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                     <canvas ref={canvasRef} style={{ paddingLeft:'30%', paddingTop:'80px' }} />
//                     <Box sx={{ top: '80px', position: 'absolute', left: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                         <Button
//                             startIcon={<SaveIcon sx={{ color: 'var(--primary-color)' }} />}
//                             onClick={handleSaveAndDownload}
//                             style={{ fontSize:'18px',gap: '15px', color: 'black', marginTop: "20px", padding: "10px 15px", cursor: "pointer", border: '2px solid var(--primary-color)' }}
//                         >
//                             לשמירה והורדה
//                         </Button>
//                         <Button
//                             startIcon={<PrintIcon sx={{ color: 'var(--primary-color)' }} />}
//                             onClick={handlePrint}
//                             style={{fontSize:'18px', gap: '15px', color: 'black', marginTop: "20px", padding: "10px 15px", cursor: "pointer", border: '2px solid var(--primary-color)' }}
//                         >
//                             להדפסת ההזמנה
//                         </Button>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </>
//     );
// };






// src/components/design/DesignInvitation.tsx
import { useEffect, useRef, useState } from "react"
import { fabric } from "fabric"
import axios from "axios"
import { Template } from "../../models/Template"
import { useNavigate } from "react-router"
import { Grid, Box, Button, Typography, CircularProgress } from "@mui/material"
import PrintIcon from "@mui/icons-material/Print"
import SaveIcon from "@mui/icons-material/Save"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { TemplateField } from "../../models/TemplateField"
import TextEditorSidebar from "./TextEditorSideBar"

export default function DesignInvitation({ templateId }: { templateId: string }) {
  const [template, setTemplate] = useState<Template | null>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`/api/templates/${templateId}`)
        setTemplate(res.data)
      } catch (err) {
        console.error("שגיאה בטעינת תבנית:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [templateId])

  useEffect(() => {
      if (!template || !canvasRef.current) return
  
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
        preserveObjectStacking: true,
      })
      setCanvas(fabricCanvas)
  
      fabric.Image.fromURL(template.fileUrl, (img) => {
        fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas), {
          scaleX: fabricCanvas.width! / img.width!,
          scaleY: fabricCanvas.height! / img.height!,
        })
      })
  
      const fields = template.templateFields 
  
      fields.forEach((field: TemplateField) => {
        const text = new fabric.Text(field.field.name || "טקסט", {
          left: field.x,
          top: field.y,
          fontSize: 30,
          fontFamily: "Arial",
          fill: "#000",
          selectable: true,
        })
        // הוספת תכונה מותאמת אישית רק אם נדרש
        ;(text as any).fieldName = field.field.name
        fabricCanvas.add(text)
      })
  
      return () => {
        fabricCanvas.dispose()
      }
    }, [template])

  const exportAsPDF = async () => {
    if (!canvasRef.current) return

    const canvasElement = canvasRef.current

    const canvasImg = await html2canvas(canvasElement, {
      allowTaint: true,
      useCORS: true,
    })

    const imgData = canvasImg.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("invitation.pdf")
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>טוען תבנית...</Typography>
      </Box>
    )
  }

  if (!template) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">לא נמצאה תבנית</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={9}>
        <Box sx={{ position: "relative", overflow: "auto", border: "1px solid #ccc", borderRadius: 2 }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={1120}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={exportAsPDF}>
            שמור כ-PDF
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)} startIcon={<PrintIcon />}>
            חזור
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={3}>
        {canvas && (
          <TextEditorSidebar canvas={canvas} fieldsWithPlaces={template.templateFields || []} />
        )}
      </Grid>
    </Grid>
  )
}
