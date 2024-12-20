import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchDepartment = createAsyncThunk("fetchDepartment",async ()=>{
     const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/department/get`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = decryptData(response.data.data)
    return responseData;
})

const departmentSlice = createSlice({
    name:"department",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchDepartment.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default departmentSlice.reducer;