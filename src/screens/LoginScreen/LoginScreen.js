import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import loginStyles from "./LoginScreen.style";
import { Button, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PATH from "../../navigation/NavigatiohPath";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/loginSlice";
import { setIsLoading } from "../../store/loading/loadingSlice";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const [inputErrors, setInputErrors] = useState({
        isValidEmail: "",
        isValidPassword: "",
    });

    const validateInputs = () => {
        const errors = {};
        if (email.trim() === "") {
            errors.isValidEmail = "Username or email is required";
        }
        if (password.trim() === "") {
            errors.isValidPassword = "Password is required";
        }
        return errors;
    };

    const isErrorView = (errorValidation) => {
        if (errorValidation) {
            return (
                <Text style={{ color: "red", marginBottom: 7 }}>
                    {errorValidation}
                </Text>
            );
        }
    };

    const handleLogin = async () => {
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            setInputErrors(errors);
        } else {
            try {
                dispatch(setIsLoading(true));
                const response = await dispatch(loginUser({ email, password }));
                if (response.meta.requestStatus === "fulfilled") {
                    navigation.replace(PATH.HOME);
                } else {
                    Alert.alert("Login Failed !!! Invalid Email OR Password");
                }
            } catch (error) {
                console.error("Error Login ", error);
            } finally {
                dispatch(setIsLoading(false));
            }
        }
    };

    return (
        <View style={loginStyles.container}>
            <View style={loginStyles.logoSection}>
                <Image
                    style={{
                        width: "80%",
                        height: 150,
                    }}
                    source={require("../../shared/assets/login.gif")}
                />
            </View>
            <View style={{ flex: 2, paddingHorizontal: 15 }}>
                <View style={loginStyles.form}>
                    <Text style={[loginStyles.headerForm, loginStyles.title]}>
                        Log in to TokonyaDia
                    </Text>
                    <TextInput
                        placeholder="Ext. muhajiralfath@gmail.com"
                        variant="outlined"
                        label="Email"
                        color="green"
                        value={email}
                        onChangeText={(val) => {
                            setEmail(val);
                            setInputErrors({
                                ...inputErrors,
                                isValidEmail: "",
                            });
                        }}
                    />
                    {isErrorView(inputErrors.isValidEmail)}
                    <TextInput
                        variant="outlined"
                        label="Password"
                        value={password}
                        color="green"
                        secureTextEntry={true}
                        placeholder="******"
                        onChangeText={(val) => {
                            setPassword(val);
                            setInputErrors({
                                ...inputErrors,
                                isValidPassword: "",
                            });
                        }}
                    />
                    {isErrorView(inputErrors.isValidPassword)}
                    <View
                        style={{
                            marginVertical: 6,
                        }}
                    >
                        <Button
                            style={{
                                width: "50%",
                                alignSelf: "center",
                                marginTop: 16,
                            }}
                            variant="contained"
                            color="green"
                            title="Login"
                            leading={(props) => (
                                <Icon name="new-box" {...props} />
                            )}
                            onPress={handleLogin}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
