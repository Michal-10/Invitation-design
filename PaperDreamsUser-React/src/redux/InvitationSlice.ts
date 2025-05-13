import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invitation } from "../models/invitation";
export const setInvitation = createAsyncThunk("invitation",
  async ({invitation}: { invitation: Invitation}) => {
   return invitation;
  }
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState:{
    Invitation: {} as Invitation,
    loading: true,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(setInvitation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(setInvitation.fulfilled, (state, action:PayloadAction<Invitation>) =>{
      state.loading = false;
      state.Invitation = action.payload;
      state.error = null;
    })
    .addCase(setInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" 
          ? action.payload 
          : action.error.message || "Error fetching recipes";
      })
     
  },
});
export default invitationSlice