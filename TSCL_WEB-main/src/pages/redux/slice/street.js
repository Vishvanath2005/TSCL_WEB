import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"
import decryptData from "../../../Decrypt"

export const fetchStreet = createAsyncThunk("fetchStreet",async ()=>{
  const token =sessionStorage.getItem('token')
    const response = await axios.get(`${API}/street/getactive`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const responseData = decryptData(response.data.data)
    return responseData;
})

const streetSlice = createSlice({
    name:"street",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchStreet.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchStreet.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchStreet.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default streetSlice.reducer;