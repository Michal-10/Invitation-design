// import { setFileUrl, setTemplates, setLoading, setError, addCompletedInvitation } from './invitationSlice';
// import axios from 'axios';

// // פעולה להעלאת קובץ ל-S3
// export const uploadFileToS3 = (file) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await axios.post('/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     const fileUrl = response.data.url;
//     dispatch(setFileUrl(fileUrl)); // שמירה של ה-URL ב-redux
//   } catch (error) {
//     dispatch(setError('Error uploading file'));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // פעולה לשליפת תבניות
// export const fetchTemplates = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await axios.get('/api/templates');
//     dispatch(setTemplates(response.data)); // שמירה של התבניות ב-redux
//   } catch (error) {
//     dispatch(setError('Error fetching templates'));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // פעולה לשמירת הזמנה
// export const saveCompletedInvitation = (invitationData) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await axios.post('/api/completed-invitations', invitationData);
//     dispatch(addCompletedInvitation(response.data)); // שמירה של ההזמנה המושלמת ב-redux
//   } catch (error) {
//     dispatch(setError('Error saving invitation'));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

import React from 'react'

export default function invitationActions() {
  return (
    <div>invitationActions</div>
  )
}
