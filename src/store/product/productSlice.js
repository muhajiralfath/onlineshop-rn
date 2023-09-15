import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    status: "idle",
    transactionStatus: "idle",
    transactionError: null,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const response = await axios.get(
                "http://10.10.100.254:8080/api/products"
            );
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
);

export const createTransaction = createAsyncThunk(
    "transactions/createTransaction",
    async (transactionData, thunkAPI) => {
        try {
            const token = await AsyncStorage.getItem("token");

            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(
                "http://10.10.100.254:8080/api/transactions",
                transactionData,
                axiosConfig
            );
            console.log(axiosConfig);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error("Error:", error);
            throw thunkAPI.rejectWithValue(error.response.data.errors);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.transactionStatus = "loading";
                state.transactionError = null;
            })
            .addCase(createTransaction.fulfilled, (state) => {
                state.transactionStatus = "succeeded";
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.transactionStatus = "failed";
                state.transactionError = action.error.message;
            });
    },
});

export default productSlice.reducer;
