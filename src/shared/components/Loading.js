import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "@react-native-material/core";

const Loading = () => {
    const isLoading = useSelector((state) => state.loading.isLoading);
    return (
        isLoading && (
            <Modal transparent={true} animationType="none">
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            </Modal>
        )
    );
};

export default Loading;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
});
