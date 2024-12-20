import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchWard = createAsyncThunk("fetchWard",async ()=>{
  const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/ward/getactive`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = decryptData(response.data.data)
    return responseData;
})

const wardSlice = createSlice({
    name:"ward",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchWard.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchWard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchWard.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default wardSlice.reducer;