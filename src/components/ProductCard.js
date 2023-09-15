import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ProductCard = ({ item, onBuyPress, userId }) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(item.price);

    return (
        <View style={styles.cardContainer}>
            <Image
                source={{
                    uri:
                        "http://10.10.100.254:8080" + item.productImages[0].url,
                }}
                style={styles.image}
            />
            <Text style={styles.name}>{item.productName}</Text>
            <Text style={styles.price}>{formattedPrice}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                }}
            >
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => onBuyPress(item.productPriceId)}
                >
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
                <Button
                    style={{
                        width: "auto",
                    }}
                    variant="outlined"
                    color="green"
                    leading={(props) => <Icon name="cart" {...props} />}
                    onPress={() =>
                        Alert.alert(
                            "Cart Under Maintenance !, Avaliable on Next Update "
                        )
                    }
                />
            </View>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        margin: 8,
        padding: 16,
        alignItems: "center",
        elevation: 3,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: "cover",
        marginBottom: 8,
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    stock: {
        fontSize: 14,
        color: "#888",
        marginBottom: 8,
    },
    buyButton: {
        backgroundColor: "green",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buyButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
