import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Invitation {
  id: number;
  name: string;
  imageUrl: string;
  downloadUrl: string;
}

interface InvitationsState {
  invitations: Invitation[];
  loading: boolean;
}

const initialState: InvitationsState = {
  invitations: [],
  loading: false,
};

// פעולה אסינכרונית לשליפת ההזמנות של המשתמש
export const fetchUserInvitations = createAsyncThunk(
  "completedInvitations/fetch",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5077/api/CompletedInvitation/user/${userId}`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Failed to fetch invitations");
    }
  }
);

const completedInvitationsSlice = createSlice({
  name: "completedInvitations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInvitations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload;
      })
      .addCase(fetchUserInvitations.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching invitations:", action.payload);
      });
  },
});

export default completedInvitationsSlice.reducer;
