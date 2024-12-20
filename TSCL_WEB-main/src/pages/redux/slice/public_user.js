import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchPublic_User = createAsyncThunk("fetchPublic_User",async ()=>{
    const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/public-user/get`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = decryptData(response.data.data)
    return responseData;
})

const publicUserSlice = createSlice({
    name:"publicUser",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchPublic_User.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchPublic_User.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchPublic_User.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default publicUserSlice.reducer;