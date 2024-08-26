import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchOrganization = createAsyncThunk("fetchOrganization",async ()=>{
    const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/organization/get`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const responseData = decryptData(response.data.data)
    return responseData;
})

const organizationSlice = createSlice({
    name:"organization",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchOrganization.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchOrganization.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchOrganization.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default organizationSlice.reducer;