import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducer"
const Store=configureStore({
    reducer:{
        data:dataSlice
    }
})
export default Store