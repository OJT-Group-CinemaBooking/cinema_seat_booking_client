import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../features/config/baseURL";
import axios from "axios";

export const registerNewUser = createAsyncThunk(
  "registerNewUser",
  async (user) => {
    const response = await axios.post(`${USER_URL}/create`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization : localStorage.getItem('token')
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
);

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await axios.get(`${USER_URL}/all`);
  return {
    data: response.data,
    status: response.status,
  };
});

export const updateUser = createAsyncThunk('update',async (user) => {
  const response = await axios.put(`${USER_URL}/update`,user,{
      headers : {
          'Content-Type' : 'application/json',
      Authorization : localStorage.getItem('token')
      }})

  return {
      data : response.data,
      statusCode : response.status
  }
})

export const getUserById = createAsyncThunk('getUserById',async (userId) => {
  const response = await axios.get(`${USER_URL}/${userId}`,{
    headers : {
      Authorization : localStorage.getItem('token')
    }
  })
  return {
    data : response.data,
    statusCode : response.status
  }
})

const initialState = {
  users: [],
  user:{},
  createdUser : {},
  createStatus: "idle",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserCreateStatusToIdle: (state) => {
      state.createStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        if (action.payload?.status) {
          const { data, status } = action.payload;
          if (status !== 200) {
            console.log(
              `Failed to register new user with status code = ${status}`
            );
            return;
          }
          state.createdUser = data
          state.users = [data, ...state.users];
          state.createStatus = "success";
        }
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload?.status) {
          const { data, status } = action.payload;
          if (status !== 200) {
            console.log(`failed to fetch users with status code = ${status}`);
            return;
          }
          state.users = data;
          state.status = "fetch_success";
        }
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "fetch_failed";
        state.error = action.error;
      })
      .addCase(updateUser.pending,(state) => {
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
          state.user = action.payload
          state.status = 'success'
      })
      .addCase(getUserById.pending,(state) => {
        state.status = 'loading'
      })
      .addCase(getUserById.fulfilled,(state,action) => {
        state.user = action.payload.data
        state.status = 'success'
      })
  },
});

export default userSlice.reducer;
export const getAllUsers = (state) => state.user.users;
export const getUser = (state) => state.user.user;
export const getCreatedUser = (state) => state.user.createdUser
export const getStatus = (state) => state.user.status;
export const getCreateStatus = (state) => state.user.createStatus
export const getUserError = (state) => state.user.error;
export const { setUserCreateStatusToIdle } =  userSlice.actions
