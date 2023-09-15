import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AppNavigation from "./src/navigation/RootNavigator";
import Loading from "./src/shared/components/Loading";
import DepProvider from "./src/context/DependencyContext";
import apiClient from "./src/service/ApiClient";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <DepProvider services={{ apiClient: apiClient }}>
                    <AppNavigation />
                    <Loading />
                    <StatusBar style="auto" />
                </DepProvider>
            </Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
