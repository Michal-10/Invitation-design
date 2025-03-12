// import { useState } from "react";
// import FileUpload from '../FileUpload'; // ייבוא רכיב העלאת קובץ
// import TemplateSelection from '../TemplateSelection'; // ייבוא רכיב בחירת תבנית
// import DesignEditor from './DesignEditor'; // ייבוא רכיב עורך העיצוב
// import InvitationPreview from './InvitationPreview'; // ייבוא רכיב תצוגה מקדימה של הזמנה
// import { saveCompletedInvitation } from '../redux/invitationActions'; // ייבוא הפעולה לשמירת העיצוב

// export const DesignInvitation = ()=>{
// const [fileUrl, setFileUrl] = useState('');
//   const [templateId, setTemplateId] = useState(null);
//   const [textContent, setTextContent] = useState('');

//   const handleFileUploaded = (url) => {
//     setFileUrl(url);
//   };

//   const handleTemplateSelected = (templateId) => {
//     setTemplateId(templateId);
//   };

//   const handleSaveDesign = async (newContent) => {
//     setTextContent(newContent);
//     // כאן נשמור את העיצוב במסד נתונים
//     await saveCompletedInvitation({
//       userId: 1, // לדוגמה, מזהה המשתמש
//       templateId,
//       content: newContent,
//       imageUrl: fileUrl,
//       eventType: 'Wedding', // סוג האירוע
//     });
//   };

//   return (
//     <div>
//       <h1>Create Your Invitation</h1>

//       <FileUpload onFileUploaded={handleFileUploaded} />
//       {fileUrl && <TemplateSelection onTemplateSelected={handleTemplateSelected} />}
//       {templateId && (
//         <DesignEditor
//           imageUrl={fileUrl}
//           content={textContent}
//           onSave={handleSaveDesign}
//         />
//       )}
//       {textContent && <InvitationPreview imageUrl={fileUrl} content={textContent} />}
//     </div>
//   );
// };
import React from 'react'

export default function designInvitation() {
  return (
    <div>designInvitation</div>
  )
}
