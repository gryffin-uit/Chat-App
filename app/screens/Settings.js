import React from "react";
import { Text, View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import ContactRow from "../components/ContactRow";
import { colors } from "../config/constants";
import Cell from "../components/Cell";
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons'

const Settings = ({ navigation }) => {

    async function openGithub(url) {
        await Linking.openURL(url);
    };

    return (
        <View>
            <ContactRow
                name={auth?.currentUser?.displayName ?? 'No name'}
                subtitle={auth?.currentUser?.email}
                style={styles.contactRow}
                onPress={() => {
                    navigation.navigate('Profile');
                }}
            />

            <Cell
                title='Account'
                subtitle='Log out & Delete account'
                icon='key-outline'
                onPress={() => {
                    navigation.navigate('Account');
                }}
                iconColor="black"
                style={{ marginTop: 20 }}
            />

            <Cell
                title='Help'
                subtitle='Contact us & App info'
                icon='help-circle-outline'
                iconColor="black"
                onPress={() => {
                    navigation.navigate('Help');
                }}
            />

            <TouchableOpacity style={styles.githubLink} onPress={() => openGithub('https://github.com/gryffin-uit/Chat-App')}>
                <View >
                    <Text style={{ fontSize: 12, fontWeight: '400' }}>
                        <Ionicons name="logo-github" size={12} style={{ color: colors.black }} />
                        {' '}Link to Github
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    contactRow: {
        backgroundColor: 'white',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border
    },
    githubLink: {
        marginTop: 20,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 100,
    },
})

export default Settings;
