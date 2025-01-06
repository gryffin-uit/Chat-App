import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "../config/constants";

const About = ({ navigation }) => {

    return (
        <View>
            <Text>
                About Page
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    contactRow: {
        backgroundColor: 'white',
        marginTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border
    }
})

export default About;
