
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";
import courseReducer from "./slices/courseSlice"
import viewCourseReducer from "./slices/viewCourseSlice"

import { combineReducers } from "@reduxjs/toolkit";



export const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    cart : cartReducer,
    course : courseReducer,
    viewCourse : viewCourseReducer
})