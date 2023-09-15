import { StyleSheet } from "react-native";
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    logoSection: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        padding: 25,
        borderRadius: 15,
        gap: 20,
    },
    headerForm: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "green",
        alignSelf: "center",
    },
});

export default loginStyles;
