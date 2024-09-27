import { configureStore } from "@reduxjs/toolkit";
import UserDetails from "../features/UserDetailsSlice";

export const store =configureStore ({
    reducer:{
        app:UserDetails
    }
})