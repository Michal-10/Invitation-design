
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz
import pdfplumber
import pytesseract
from PIL import Image
import io
import docx
import json
import uvicorn
from openai import OpenAI
import re
from datetime import datetime

app = FastAPI()
openai = OpenAI(api_key='')
# ✅ הוספת CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ניתן לשנות לכתובת ספציפית ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# פונקציות לשליפת טקסט
def extract_text_from_pdf(file_stream):
    """ חילוץ טקסט מקובץ PDF """
    text = ""
    try:
        doc = fitz.open(stream=file_stream, filetype="pdf")
        for page in doc:
            text += page.get_text()
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {str(e)}"

def extract_text_from_image(file):
    image = Image.open(io.BytesIO(file))
    text = pytesseract.image_to_string(image, lang="heb+eng")
    return text.strip()

def extract_text_from_docx(file):
    doc = docx.Document(io.BytesIO(file))
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

# פונקציה לחילוץ תאריך מתוך טקסטי
def extract_date_from_text(text):
    """ פונקציה לחילוץ תאריך מתוך טקסט """
    date_pattern = r"(\d{1,2})[./-](\d{1,2})[./-](\d{4})"
    matches = re.findall(date_pattern, text)
    print("Matches found:", matches)  # הדפסת התאריכים שנמצאו

    if matches:
        for match in matches:
            day, month, year = match
            # נוודא שהתאריך תקין
            try:
                date_str = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
                return datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                continue
    return None

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), event_type: str = Form(...)):
    file_bytes = await file.read()

    # בדיקה אם הקובץ ריק
    if not file_bytes:
        raise HTTPException(status_code=400, detail="הקובץ ריק")

    extracted_text = ""
    
    # בדיקה וסינון סוג הקובץ
    if file.content_type == "application/pdf":
        extracted_text = extract_text_from_pdf(io.BytesIO(file_bytes))
        print(extracted_text)
    elif file.content_type.startswith("image/"):
        extracted_text = extract_text_from_image(file_bytes)
    elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        extracted_text = extract_text_from_docx(file_bytes)
    else:
        raise HTTPException(status_code=400, detail="סוג הקובץ אינו נתמך")

    if not extracted_text:
        raise HTTPException(status_code=400, detail="לא נמצא טקסט בקובץ")

    # חילוץ תאריך מהטקסט
    extracted_date = extract_date_from_text(extracted_text)
    print(extracted_date)

    if event_type == "חתונה":
        extraction_prompt = """
        You are an AI that extracts wedding invitation details.  
        Always return **ONLY** a valid JSON object with the following structure:  
        {
            "groom_name": "שם החתן",
            "bride_name": "שם הכלה",
            "wedding_date": "YYYY-MM-DD",
            "wedding_time": "שעת החתונה",
            "wedding_location": "מיקום החתונה"
        }
        If a field is missing, set its value to null.  
        Respond **only** with the JSON object (nothing else).  
        """
    else:
        extraction_prompt = """
        You are an AI that extracts birthday invitation details.  
        Always return **ONLY** a valid JSON object with the following structure:  
        {
            "name": "שם ",
            "event_date": "YYYY-MM-DD",
            "event_time": "שעת הארוע",
            "event_location": "מיקום הארוע",
            "event_type": "סוג האירוע",
            "age": "גיל",
        }
        If a field is missing, set its value to null.  
        Respond **only** with the JSON object (nothing else).  
        """

    if not extraction_prompt:
        raise HTTPException(status_code=400, detail="סוג האירוע אינו תקין")

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": extraction_prompt},
                {"role": "user", "content": extracted_text}
            ]
        )
        json_response = json.loads(response.choices[0].message.content)
        
        # הוספת התאריך שהופק מהטקסט (אם נמצא)
        if extracted_date:
            json_response["wedding_date"] = str(extracted_date)  # תאריך החתונה
        else:
            json_response["wedding_date"] = None  # אם לא נמצא תאריך

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"שגיאה בעיבוד הנתונים: {str(e)}")

    return json_response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)
