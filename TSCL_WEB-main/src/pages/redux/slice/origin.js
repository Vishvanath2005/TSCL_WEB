import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../Host";
import decryptData from "../../../Decrypt";

export const fetchOrigin = createAsyncThunk(
  "fetchOrigin",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/resource/getactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = decryptData(response.data.data);
    return responseData;
  }
);

const originSlice = createSlice({
  name: "origin",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrigin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrigin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrigin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default originSlice.reducer;