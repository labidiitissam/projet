import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {addClientService} from "./RegisterService"

const user=localStorage.getItem("user")

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  data:[],
  message: "",
};

// add client
export const addClientSlice = createAsyncThunk("client/add", async (userdata, thunkAPI) => {
  try {
    return await addClientService(userdata) 
  } catch (error) {
    const message =error.response.data
    return thunkAPI.rejectWithValue(message);
  }
});

 export const ClientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClientSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addClientSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data=action.payload
      })
      .addCase(addClientSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
       
      })
  },
});



export const { reset } = ClientSlice.actions
export default ClientSlice.reducer