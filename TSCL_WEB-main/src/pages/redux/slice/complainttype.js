import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchComplainttype = createAsyncThunk("fetchComplainttype",async ()=>{
  const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/complainttype/get`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = decryptData(response.data.data);
    return responseData;
})

const complainttypeSlice = createSlice({
    name:"complainttype",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchComplainttype.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchComplainttype.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchComplainttype.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default complainttypeSlice.reducer;