// // DesignEditor.js
// import React, { useState } from 'react';

// const DesignEditor = ({ imageUrl, content, onSave }) => {
//   const [textContent, setTextContent] = useState(content);

//   const handleContentChange = (e) => {
//     setTextContent(e.target.value);
//   };

//   const handleSave = () => {
//     onSave(textContent); // שמירה של העיצוב
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ flex: 1 }}>
//         <img src={imageUrl} alt="Invitation" style={{ width: '100%' }} />
//       </div>
//       <div style={{ flex: 1 }}>
//         <textarea
//           value={textContent}
//           onChange={handleContentChange}
//           placeholder="Enter your text"
//           rows={10}
//           style={{ width: '100%' }}
//         />
//         <button onClick={handleSave}>Save Design</button>
//       </div>
//     </div>
//   );
// };

// export default DesignEditor;
import React from 'react'

export default function DesignEditor() {
  return (
    <div>DesignEditor</div>
  )
}

