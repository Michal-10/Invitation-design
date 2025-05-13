// קובץ: pages/api/send-invitation-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// הגדרת התגובה מה-API
type ResponseData = {
  success: boolean;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // בדיקה שהבקשה היא מסוג POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, fileName } = req.body;

    // בדיקת תקינות האימייל
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'כתובת אימייל לא תקינה' });
    }

    // בדיקת קיום שם הקובץ
    if (!fileName) {
      return res.status(400).json({ success: false, message: 'שם קובץ חסר' });
    }

    // נתיב לקובץ ההזמנה
    const invitationPath = path.join(process.cwd(), 'public', 'completed-invitations', fileName);
    
    // בדיקה שהקובץ קיים
    if (!fs.existsSync(invitationPath)) {
      return res.status(404).json({ success: false, message: 'קובץ ההזמנה לא נמצא' });
    }

    // יצירת transporter של nodemailer
    // שים לב: יש להגדיר משתני סביבה עבור פרטי חשבון הדואר האלקטרוני
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // הגדרת תוכן המייל
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'your-app-email@example.com',
      to: email,
      subject: 'ההזמנה שלך מאפליקציית ההזמנות',
      text: 'מצורפת ההזמנה שביקשת.',
      html: `
        <div dir="rtl">
          <h2>הנה ההזמנה שביקשת!</h2>
          <p>תודה שהשתמשת באפליקציית ההזמנות שלנו.</p>
          <p>מצורפת ההזמנה שיצרת.</p>
        </div>
      `,
      attachments: [
        {
          filename: `הזמנה-${new Date().toLocaleDateString('he-IL').replace(/\./g, '-')}.png`,
          path: invitationPath,
        },
      ],
    };

    // שליחת המייל
    await transporter.sendMail(mailOptions);

    // החזרת תשובה חיובית
    return res.status(200).json({ success: true, message: 'המייל נשלח בהצלחה' });
  } catch (error) {
    console.error('שגיאה בשליחת המייל:', error);
    return res.status(500).json({ success: false, message: 'שגיאה בשליחת המייל' });
  }
}