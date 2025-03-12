// import { createSlice } from '@reduxjs/toolkit';

// // התחלת מצב (initial state) של המערכת
// const initialState = {
//   fileUrl: '',
//   templates: [],
//   selectedTemplate: null,
//   textContent: '',
//   completedInvitations: [],
//   loading: false,
//   error: null,
// };

// const invitationSlice = createSlice({
//   name: 'invitation',
//   initialState,
//   reducers: {
//     setFileUrl: (state, action) => {
//       state.fileUrl = action.payload;
//     },
//     setTemplates: (state, action) => {
//       state.templates = action.payload;
//     },
//     setSelectedTemplate: (state, action) => {
//       state.selectedTemplate = action.payload;
//     },
//     setTextContent: (state, action) => {
//       state.textContent = action.payload;
//     },
//     addCompletedInvitation: (state, action) => {
//       state.completedInvitations.push(action.payload);
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// // Actions
// export const {
//   setFileUrl,
//   setTemplates,
//   setSelectedTemplate,
//   setTextContent,
//   addCompletedInvitation,
//   setLoading,
//   setError,
// } = invitationSlice.actions;

// // Reducer
// export const selectRecipes = (state) => state.recipes;
// export const { actions } = invitationSlice;

// export default invitationSlice;

import React from 'react'

export default function invitationSlice() {
  return (
    <div>invitationSlice</div>
  )
}
