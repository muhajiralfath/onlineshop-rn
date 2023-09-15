import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect } from "react";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PATH from "../../navigation/NavigatiohPath";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product/productSlice";
import ProductCard from "../../components/ProductCard";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const isLoggin = useSelector((state) => state.login.isLoggin);

    useEffect(() => {
        dispatch(fetchProducts());
        console.log(products);
        console.log(isLoggin);
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <ProductCard item={item} onBuyPress={handleBuy} />
    );

    const handleBuy = (product) => {
        console.log(`Membeli ${product.name}`);
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
                        variant="text"
                        title="logout"
                        color="white"
                        leading={(props) => <Icon name="login" {...props} />}
                        onPress={() => navigation.navigate(PATH.LOGIN)}
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
