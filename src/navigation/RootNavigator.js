import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PATH from "./NavigatiohPath";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import CartScreen from "../screens/CartScreen/CartScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={PATH.SPLASH}>
                <Stack.Screen
                    name={PATH.SPLASH}
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={PATH.HOME}
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={PATH.LOGIN}
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={PATH.CART}
                    component={CartScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
