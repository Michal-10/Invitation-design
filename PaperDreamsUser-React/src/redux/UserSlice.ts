import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "../Services/User";
import { User } from "../models/User";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../pages/firebase";
import { jwtDecode } from "jwt-decode";

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/${status}`, data);
      sessionStorage.setItem("userToken", response.data.token);

      return response.data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk("googleLogin", async ({ mode }: { mode: string }, thunkAPI) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      FirstName: user.displayName?.split(" ")[0] ?? "Unknown",
      LastName: user.displayName?.split(" ")[1] ?? "User",
      Email: user.email,
      Password: user.uid, // סיסמה מזוהה לפי UID מגוגל (לא נחשפת)
      Role: "user",
      UpdatedAt: new Date()
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/${mode}`, userData);
    sessionStorage.setItem("userToken", response.data.token);
    return response.data;

  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk("updateUser",
  async ({ user }: { user: Partial<User> }, thunkAPI) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update-profile`, user,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` } }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialUser = () => {
  const token = sessionStorage.getItem("userToken") ;
    if (!token)
      return {} as User;

    try {
        const decoded = jwtDecode<User>(token);
        return {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            role: decoded.role,
            created_at: new Date(decoded.created_at),
            updatedAt: new Date(decoded.updatedAt),
        };
    } catch (error) {
        console.error("Invalid token", error);
        return {} as User;
    }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser(),
    loading: true,
    error: null as string | null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRegister.fulfilled, (state, action) => {
        state.loading = false;
        const decodedToken = decodeToken();
        state.user = {
          id: decodedToken?.decoded.userId ?? action.payload.user.id,
          firstName: decodedToken?.decoded.firstName ?? action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: decodedToken?.decoded.email ?? action.payload.user.email,
          role: action.payload.user.role,
          created_at: action.payload.user.created_at,
          updatedAt: action.payload.user.updatedAt
        };
      })
      .addCase(loginRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error login to system";
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;

        const decodedToken = decodeToken();
        state.user = {
          id: decodedToken?.decoded.userId ?? action.payload.user.id,
          firstName: decodedToken?.decoded.firstName ?? action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: decodedToken?.decoded.email ?? action.payload.user.email,
          role: action.payload.user.role,
          created_at: action.payload.user.created_at,
          updatedAt: action.payload.user.updatedAt,
        };
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Google login failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const decodedToken = decodeToken();
        state.user = {
          id: decodedToken?.decoded.userId ?? action.payload.user.id,
          firstName: decodedToken?.decoded.firstName ?? action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: decodedToken?.decoded.email ?? action.payload.user.email,
          role: action.payload.user.role,
          created_at: action.payload.user.created_at,
          updatedAt: action.payload.user.updatedAt,
        };
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