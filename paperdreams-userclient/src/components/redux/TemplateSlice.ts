import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Template {
  id: number;
  name: string;
  imageUrl: string;
}

interface TemplatesState {
  templates: Template[];
  loading: boolean;
}

const initialState: TemplatesState = {
  templates: [],
  loading: false,
};

// פעולה אסינכרונית לשליפת התבניות
export const fetchTemplates = createAsyncThunk(
  "templates/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5077/api/templates");
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Failed to fetch templates");
    }
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching templates:", action.payload);
      });
  },
});

export default templatesSlice.reducer;
