import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PATH from "../../navigation/NavigatiohPath";

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                style={{
                    width: "100%",
                    alignSelf: "center",
                    marginTop: 16,
                }}
                variant="outlined"
                title="LOGIN"
                leading={(props) => <Icon name="new-box" {...props} />}
                onPress={() => navigation.navigate(PATH.LOGIN)}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
