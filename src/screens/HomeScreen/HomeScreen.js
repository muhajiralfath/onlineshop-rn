import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PATH from "../../navigation/NavigatiohPath";
import { useDispatch, useSelector } from "react-redux";
import {
    createTransaction,
    fetchProducts,
} from "../../store/product/productSlice";
import ProductCard from "../../components/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsLoggin } from "../../store/auth/loginSlice";
import { setIsLoading } from "../../store/loading/loadingSlice";
import EmpetyListScreen from "../../shared/components/EmpetyList";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const isLoggin = useSelector((state) => state.login.isLoggin);
    const [userId, setUserId] = useState("");

    const getId = async () => {
        const token = await AsyncStorage.getItem("id");
        setUserId(token);
    };

    useEffect(() => {
        dispatch(setIsLoading(true));
        dispatch(fetchProducts());
        dispatch(setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        getId();
    }, []);

    const renderItem = ({ item }) => (
        <ProductCard item={item} onBuyPress={handleBuy} />
    );

    const handleBuy = (productPriceId) => {
        if (!isLoggin) {
            Alert.alert("Please Login Firts to Buy Product");
            return;
        }
        dispatch(setIsLoading(true));
        const productData = {
            customerId: userId,
            orderDetails: [
                {
                    productPriceId: productPriceId,
                    quantity: 1,
                },
            ],
        };

        dispatch(createTransaction(productData))
            .then(() => {
                dispatch(setIsLoading(false));
                dispatch(fetchProducts());
                Alert.alert(
                    "Transaction Success !! Data Stock Has Been Updated"
                );
            })
            .catch((error) => {
                dispatch(setIsLoading(false));
                Alert.alert("Transaction Failed! Please Try Again !");
            });
    };

    const logout = async () => {
        dispatch(setIsLoading(true));
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("id");
        dispatch(setIsLoggin(false));
        dispatch(setIsLoading(false));
    };

    return (
        <View style={styles.container}>
            <View style={styles.headWrapper}>
                <Text style={styles.title}>TokonyaDia</Text>
                {isLoggin ? (
                    <Button
                        style={{
                            width: "30%",
                        }}
                        variant="contained"
                        title="logout"
                        color="white"
                        leading={(props) => <Icon name="login" {...props} />}
                        onPress={logout}
                    />
                ) : (
                    <Button
                        style={{
                            width: "30%",
                        }}
                        variant="contained"
                        title="login"
                        color="white"
                        leading={(props) => <Icon name="login" {...props} />}
                        onPress={() => navigation.navigate(PATH.LOGIN)}
                    />
                )}
            </View>
            <View style={styles.bodyList}>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.productId}
                    contentContainerStyle={styles.flatListContainer}
                    numColumns={2}
                    ListEmptyComponent={() => <EmpetyListScreen />}
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        color: "white",
    },
    headWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "green",
        marginTop: 24,
    },
    bodyList: {
        flex: 11,
        padding: 8,
    },
});
