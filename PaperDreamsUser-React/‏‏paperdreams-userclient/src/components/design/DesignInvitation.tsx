
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import axios from "axios";
import { Template } from "../../models/Template";
import { useNavigate } from "react-router";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { Grid, Box, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import { getDownloadURL } from "../../Services/FileService";
import { uploadFileToAWS } from "../../Services/UploadFileToAWS";
import { UserId } from "../../Services/User";
import TextEditorSidebar from "./TextEditorSideBar";

export default () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas>({} as fabric.Canvas);
    const [imageURL, setImageURL] = useState<string>("");

    const state = useSelector((state: RootState) => state.invitation.Invitation);
    const [myTtemplate, setMyTemplate] = useState<Template>({} as Template);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTemplate = JSON.parse(sessionStorage.getItem("template") || '{}');
        console.log(storedTemplate);

        setMyTemplate(storedTemplate);
        console.log(myTtemplate);

        const fetchFileUrl = async () => {

            console.log(myTtemplate?.name);
            console.log("myTtemplate?.name");

            try {
                // setImageURL(await getDownloadURL(template.name));
                // const templateName = sessionStorage.getItem("templateName");
                // if(templateName) 
                // setImageURL(await getDownloadURL(templateName));
                console.log("///////////////////////////////////////////////");
                console.log(storedTemplate.name);
                setImageURL(await getDownloadURL(storedTemplate.name));
                console.log("imageURL", imageURL);

            } catch (error) {
                console.error("שגיאה בהבאת ה-URL:", error);
                alert(`שגיאה בהבאת ה-URL: ${error}`);
            }
        };
        fetchFileUrl();
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const newCanvas = new fabric.Canvas(canvasRef.current, { backgroundColor: "" });
        setCanvas(newCanvas);
        return () => {
            newCanvas.dispose();
        };
    }, []);

    useEffect(() => {
        if (!canvas || !imageURL) return;

        const imgElement = new Image();
        imgElement.crossOrigin = "Anonymous";
        imgElement.src = imageURL;

        imgElement.onload = () => {
            const originalWidth = imgElement.width;
            const originalHeight = imgElement.height;

            const maxWidth = 550;
            const maxHeight = 657;

            const scaleFactor = Math.min(maxWidth / originalWidth, maxHeight / originalHeight, 1);
            const finalWidth = originalWidth * scaleFactor;
            const finalHeight = originalHeight * scaleFactor;

            canvas.setWidth(finalWidth);
            canvas.setHeight(finalHeight);

            const fabricImg = new fabric.Image(imgElement, {
                selectable: false,
                originX: "left",
                originY: "top",
            });

            fabricImg.set({ scaleX: scaleFactor, scaleY: scaleFactor });

            canvas.setBackgroundImage(fabricImg, () => {
                canvas.renderAll();
                addTextToCanvas(scaleFactor);
            });
        };
    }, [canvas, imageURL]);

    const addTextToCanvas = (scaleFactor: number) => {

        console.log("myTtemplate.fields");
        console.log(myTtemplate.fields);

        let exaText1 = state.text;
        console.log("exaText");
        console.log(exaText1);
        let exaText = Object.entries(exaText1);

        console.log('here', exaText);

        if (!canvas || !myTtemplate?.fields) return;
        console.log(myTtemplate.fields);
        console.log('template', myTtemplate);

        myTtemplate.fields.forEach((field) => {
            const matchingEntry = exaText.find(([key]) => key === field.fieldName);
            const matchingText = matchingEntry ? matchingEntry[1] : undefined;

            if (matchingText) {
                const value = matchingText as string;
                const xPos = field.x || 0;
                const yPos = field.y || 0;

                const scaledX = xPos;
                const scaledY = yPos;

                const textObj = new fabric.Text(value, {
                    left: scaledX,
                    top: scaledY,
                    fontSize: 50 * scaleFactor,
                    fill: "black",
                    fontWeight: "bold",
                });

                canvas.add(textObj);
            }
        });

        canvas.renderAll();
    };



    const handleSaveAndDownload = async () => {
        console.log("after setSave(true);");

        if (!canvas) return;

        const dataUrl = canvas.toDataURL({ format: "png" });
        console.log('dataUrl', dataUrl);

        const blob = await (await fetch(dataUrl)).blob();
        const timestamp = new Date().getTime();
        const newFile = new File([blob], `invitation_${timestamp}.png`, { type: "image/png" });
        console.log("bsfore setFile;", newFile);

        console.log("after setFile;");

        try {

            console.log("----------------------------------לפני שמירת מושלם");
            console.log(newFile.name);

            // בקשת URL חתום משרת ה-Backend

            const response = await axios.get(
                `http://localhost:5077/api/upload/presigned-url?fileName=${newFile.name}`
            );

            console.log("after presigned-url", response);
            console.log('response.data', response.data);

            const fileUrl = response.data;

            const invitationData = {
                Category: JSON.parse(sessionStorage.getItem("category") || '')?.id,
                ImageUrl: fileUrl,
                TemplateId: myTtemplate.id, //template.id,
                Content: "הזמנה מושלמת",
                UserId: UserId,
                Name: newFile.name
            };

            console.log("לפני שמירת מושלם");
            console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");

            await axios.post("http://localhost:5077/api/CompletedInvitation/add", invitationData);
            console.log("אחרי שמירת מושלם");

            // העלאת הקובץ ל-S3
            await uploadFileToAWS(newFile);

            // הורדת הקובץ
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "invitation.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            sessionStorage.removeItem("category");
            sessionStorage.removeItem("template");
            navigate('/');

        } catch (error) {
            console.error("Error saving invitation:", error);
            alert("שגיאה בשמירת ההזמנה.");
        }
    };


    const handlePrint = () => {
        if (!canvas) return;

        canvas.renderAll();

        setTimeout(() => {
            const dataUrl = canvas.toDataURL({ format: "png" });

            const printFrame = document.createElement("iframe");
            printFrame.style.position = "absolute";
            printFrame.style.width = "0px";
            printFrame.style.height = "0px";
            printFrame.style.border = "none";
            document.body.appendChild(printFrame);

            const doc = printFrame.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(`
                <html>
                <head>
                    <title>Print Invitation</title>
                    <style>
                        @page { size: A4 portrait; margin: 0; }
                        body { margin: 0; padding: 0; width: 100%; height: 100%; }
                        img { width: 100%; height: 100%; object-fit: cover; }
                    </style>
                </head>
                <body onload="window.print(); setTimeout(() => window.parent.document.body.removeChild(window.frameElement), 1000);">
                    <img src="${dataUrl}" />
                </body>
                </html>
            `);
                doc.close();
            }
        }, 100);
    };

    return (
        <>
            <Grid container style={{ height: "100vh", direction: "rtl" }}>
                {/* Sidebar - רבע עמוד */}

                <Grid item xs={3} style={{ padding: "3px" }}>
                    <TextEditorSidebar canvas={canvas} fields={myTtemplate.fields || []} />
                </Grid>
                {/* Canvas - שלושת רבעי עמוד */}
                <Grid item xs={9} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <canvas ref={canvasRef} style={{ alignContent: 'center', width: "100%",paddingTop:'80px' }} />
                    <Box sx={{ top: '80px', position: 'absolute', left: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Button
                            startIcon={<SaveIcon sx={{ color: 'var(--primary-color)' }} />}
                            onClick={handleSaveAndDownload}
                            style={{ fontSize:'18px',gap: '15px', color: 'black', marginTop: "20px", padding: "10px 15px", cursor: "pointer", border: '2px solid var(--primary-color)' }}
                        >
                            לשמירה והורדה
                        </Button>
                        <Button
                            startIcon={<PrintIcon sx={{ color: 'var(--primary-color)' }} />}
                            onClick={handlePrint}
                            style={{fontSize:'18px', gap: '15px', color: 'black', marginTop: "20px", padding: "10px 15px", cursor: "pointer", border: '2px solid var(--primary-color)' }}
                        >
                            להדפסת ההזמנה
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};


