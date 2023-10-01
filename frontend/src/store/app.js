import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/loginSlice"
import registerReducer from "../features/RegisterSlice"


export  const store = configureStore({
    reducer: {
        client:registerReducer,
        auth: authReducer,
    },
});



