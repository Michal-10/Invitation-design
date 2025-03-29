
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserId, UserToken } from "../Services/User";
import { User } from "../models/User";

export const loginRegister = createAsyncThunk("loginRegister",
  async ({ user, status }: { user: Partial<User>, status: string }, thunkAPI) => {
    try {
      const data = status == 'login' ? {
        Email: user.email,
        Password: user.password
      } : {
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Password: user.password,
        Role: 'user',
        UpdatedAt: new Date()
      }
      console.log("in userSlice", status);

      const response = await axios.post(`http://localhost:5077/api/user/${status}`, data);
      console.log("response", response);

      return response.data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk("updateUser",
  async ({ user }: { user: Partial<User> }, thunkAPI) => {
    try {
      console.log("userId");
      console.log(UserId);


      const response = await axios.put(`http://localhost:5077/api/user/update-profile/${UserId}`, user,
        { headers: { Authorization: `Bearer ${UserToken}` } }
      );
      return response.data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as User,
    loading: true,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRegister.fulfilled, (state, action) => {
        state.loading = false;
        console.log("loginRegister.fulfilled");
        console.log("--------------------------------");

        console.log(action.payload.user);
        console.log("--------------------------------");


        state.user = action.payload.user;
      })
      .addCase(loginRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error login to system";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error updateUser";
      })
  },
});
export default userSlice;