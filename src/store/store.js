import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading/loadingSlice";
import loginReducer from "./auth/loginSlice";
import productReducer from "./product/productSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        login: loginReducer,
        products: productReducer,
    },
});
