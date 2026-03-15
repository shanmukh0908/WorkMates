import { configureStore } from "@reduxjs/toolkit";
import headerReducer from './features/header/headerslice'
import userTypeSliceReducer from './features/userType/userTypeSlice'

const store = configureStore({   
    reducer:{
        header:headerReducer,
        userType:userTypeSliceReducer,
    }
})

export default store