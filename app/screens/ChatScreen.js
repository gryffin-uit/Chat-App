import { auth } from '../firebase';
import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';

const ChatScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={signOut}
                >
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <View>
            <Text>Chat Screen</Text>
            <Text>{auth.currentUser.displayName}</Text>
        </View>
    )
}

export default ChatScreen
