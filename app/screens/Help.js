import React from "react";
import { View, StyleSheet, Alert, Linking } from "react-native";
import { colors } from "../config/constants";
import Cell from "../components/Cell";

const Help = ({ navigation }) => {

    return (
        <View>
            <Cell
                title='Contact us'
                subtitle='Questions? Need help?'
                icon='people-outline'
                tintColor={colors.primary}
                onPress={() => {
                    Alert.alert(
                        'Contact the contributors',
                        'Contact the contributors of this project: https://github.com/gryffin-uit/Chat-App',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => Linking.openURL('https://github.com/gryffin-uit/Chat-App'),
                            },
                        ],
                        { cancelable: true }
                    );
                }}
                showForwardIcon={false}
                style={{ marginTop: 20 }}
            />
            <Cell
                title='App info'
                icon='information-circle-outline'
                tintColor={colors.pink}
                onPress={() => {
                    Alert.alert('React Native Chat App', 'Group project developed by liuchangming88, gryffin-UIT and anhphongtrng',
                        [
                            {
                                text: "Ok",
                                onPress: () => { },
                            },
                        ],
                        { cancelable: true })
                }}
                showForwardIcon={false}
            />

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

export default Help;
