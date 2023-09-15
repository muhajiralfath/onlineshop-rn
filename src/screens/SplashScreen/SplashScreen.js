import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import PATH from "../../navigation/NavigatiohPath";

export default function SplashScreen({ navigation }) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace(PATH.HOME);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../shared/assets/loadingg.gif")}
            />
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    marginTop: 10,
                    color: "white",
                }}
            >
                TokonyaDia.com
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#184c4c",
    },
    logo: {
        width: 200,
        height: 200,
    },
});
