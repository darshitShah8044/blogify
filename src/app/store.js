import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";

import blogSlice from "../reducers/blogSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        blogs: blogSlice,
    },
});
