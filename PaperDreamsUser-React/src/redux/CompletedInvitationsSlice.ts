import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { decodeToken } from "../Services/User";
import { RootState } from "./Store";
import { CompletedInvitation } from "../models/CompletedTemplates";

export const fetchCompletedInvitation = createAsyncThunk("completedInvitation/fetch",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/CompletedInvitation/userInvitation/${decodeToken()?.decoded.userId}`);
      
      return res.data as CompletedInvitation[];
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);



const CompletedInvitationsSlice = createSlice({
  name: "CompletedInvitation",
  initialState: {
    listCompletedInvitation: [] as CompletedInvitation[],
    loading: true,
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    builder.
      addCase(fetchCompletedInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedInvitation.fulfilled, (state, action: PayloadAction<CompletedInvitation[]>) => {
        state.loading = false,
          state.error = null,
          state.listCompletedInvitation = action.payload
      })
      .addCase(fetchCompletedInvitation.rejected, (state) => {
        state.loading = false,
          state.error = "Failed to load recipes"
      })
  }
});

export const selectCompletedInvitations = (state: RootState) => state.CompletedInvitation;

export default CompletedInvitationsSlice;
