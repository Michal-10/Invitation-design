import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { decodeToken } from "../Services/User";
import { User } from "../models/User";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../pages/firebase";

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

      console.log("in userSlice", data);

      console.log("axios.defaults.baseURL");
      console.log("import.meta.env.VITE_API_URL");
      console.log(import.meta.env.VITE_API_URL);
      
      
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/${status}`, data);
      console.log("----------------------");
      
      console.log("response", response);
      console.log("in userSlice", response.data.token);
      console.log("in userSlice", response.data.user);
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
      console.log("userId");


      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update-profile/${decodeToken()?.decoded.userId}`, user,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` } }
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
        console.log("loginRegister.fulfilled");
        console.log("--------------------------------");

        console.log(action.payload.user);
        console.log("--------------------------------");

        console.log(decodeToken());
        const decodedToken = decodeToken();
       console.log(action.payload.user);
       console.log({...action.payload.user});
            state.user = {
                id: decodedToken?.decoded.userId ?? action.payload.user.id,
                firstName: decodedToken?.decoded.firstName ?? action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                email: decodedToken?.decoded.email ?? action.payload.user.email,
                password: action.payload.user.password,
                role: action.payload.user.role,
                created_at: action.payload.user.created_at,
                updatedAt: action.payload.user.updatedAt,


            };
        console.log(state.user)
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
        console.log("googleLogin.fulfilled");
        console.log("--------------------------------");
        console.log(action.payload.user);
        
        state.loading = false;
      
        const decodedToken = decodeToken();
        // state.error = action.payload.user;
        console.log("googleLogin.fulfilled");
        console.log("--------------------------------");
        
        state.user = {
          id: decodedToken?.decoded.userId ?? action.payload.user.id,
          firstName: decodedToken?.decoded.firstName ?? action.payload.user.firstName,
          lastName: action.payload.user.lastName,
          email: decodedToken?.decoded.email ?? action.payload.user.email,
          password: action.payload.user.password,
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
        console.log("updateUser.fulfilled");
        console.log("--------------------------------");
        console.log(action.payload.user);
        console.log("--------------------------------");
        
        state.user = action.payload.user;
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