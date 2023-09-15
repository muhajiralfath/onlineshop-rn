import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NewButton = ({ style, variant, title, nameIcons, onPress }) => {
    return (
        <Button
            style={style}
            variant={variant}
            title={title}
            leading={(props) => <Icon name={nameIcons} {...props} />}
            onPress={onPress}
        />
    );
};

export default NewButton;

const styles = StyleSheet.create({});
