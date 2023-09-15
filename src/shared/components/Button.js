import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
