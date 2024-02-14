import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USER_URL } from "../features/config/baseURL";
import axios from "axios";
import { token } from "../features/auth/getToken";

export const registerNewUser = createAsyncThunk(
  "registerNewUser",
  async (user) => {
    const response = await axios.post(`${USER_URL}/create`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
);

export const updateUser = createAsyncThunk("updateUser", async (user) => {
  const response = await axios.put(`${USER_URL}/update`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return {
    data: response.data,
    status: response.status,
  };
});

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await axios.get(`${USER_URL}/all`);
  return {
    data: response.data,
    status: response.status,
  };
});

const initialState = {
  users: [],
  createdUser: {},
  createStatus: "idle",
  updateStatus: "idle",
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
    setUserUpdateStatusToIdle: (state) => {
      state.updateStatus = "idle";
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
          state.createdUser = data;
          state.users = [data, ...state.users];
          state.createStatus = "success";
        }
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload?.status) {
          const { data, status } = action.payload;
          if (status !== 200) {
            console.log(
              `Failed to update user with status code = ${status}`
            );
            return;
          }
          const updatedUser = data;
          const filteredUsers = state.users.filter(
            us => us.id !== updateUser.id
          )
          state.users = [updatedUser, ...filteredUsers];
          state.updateStatus = "success";
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
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
      });
  },
});

export default userSlice.reducer;
export const getAllUsers = (state) => state.user.users;
export const getCreatedUser = (state) => state.user.createdUser;
export const getStatus = (state) => state.user.status;
export const getCreateStatus = (state) => state.user.createStatus;
export const getUserError = (state) => state.user.error;
export const { setUserCreateStatusToIdle, setUserUpdateStatusToIdle } = userSlice.actions;
