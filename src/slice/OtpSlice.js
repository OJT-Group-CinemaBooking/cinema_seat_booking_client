import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OTP_URL } from "../features/config/baseURL";
import axios from "axios";
import { token } from "../features/auth/getToken";

export const validateOTP = createAsyncThunk(
  "validateOTP",
  async (data) => {
    const response = await axios.post(`${OTP_URL}/validate/${data.username}`, data.otp, {
      headers: {
        "Content-Type": "application/json",
        Authorization : token
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
);

const initialState = {
  status: "idle",
  error: null,
};

const otpSlice = createSlice({
  name: "otpSlice",
  initialState,
  reducers: {
    setUserStatusToIdle: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(validateOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        if (action.payload?.status) {
          const { status } = action.payload;
          if (status !== 200) {
            console.log(
              `Failed to validate with status code = ${status}`
            );
            return;
          }
          state.status = "success";
        }
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default otpSlice.reducer;
export const getOTPStatus = (state) => state.otp.status;
