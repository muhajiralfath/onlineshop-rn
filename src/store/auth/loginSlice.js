import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://10.10.100.254:8080/api/auth/login",
                payload
            );

            if (response.status === 200) {
                const data = response.data.data;
                console.log(data);

                thunkAPI.dispatch(loginSlice.actions.setIsLoggin(true));

                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("id", data.id);
                return data;
            } else {
                return thunkAPI.rejectWithValue(response.data.errors);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errors);
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoggin: false,
    },
    reducers: {
        setIsLoggin: (state, action) => {
            state.isLoggin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.rejected, (state) => {
            state.isLoggedIn = false;
        });
    },
});

export const { setIsLoggin } = loginSlice.actions;
export default loginSlice.reducer;
