import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AppNavigation from "./src/navigation/RootNavigator";
import Loading from "./src/shared/components/Loading";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <AppNavigation />
                <Loading />
                <StatusBar style="auto" />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
