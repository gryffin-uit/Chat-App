import { auth, db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc } from 'firebase/firestore';
import React, { useLayoutEffect, useCallback, useState, useEffect} from 'react'
import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat, Send, Actions, Message } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EmojiSelector from 'react-native-emoji-selector';


const ChatScreen = ({ navigation }) => {

    const [messages, setMessages] = useState([])
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

    // useEffect(() => {
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //             _id: 2,
    //             name: 'React Native',
    //             avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ])
    // }, [])

    useLayoutEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.id, 
                ...doc.data(), 
                createdAt: doc.data().createdAt.toDate(), 
                text: doc.data().text,
                user: doc.data().user
            })));
        });
    
        return () => unsubscribe(); 
    }, []);

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );

        const {
            _id,
            text,
            createdAt,
            user,
        } = messages[0];

        try {
            await addDoc(collection(db, 'chats'), {
                _id,
                text,
                createdAt,
                user,
            });
            console.log('Message added successfully!');
        } catch (error) {
            console.error('Error adding message: ', error);
        }
    }, []);

    //ChọnChọn Emoji
    const handleEmojiSelect = (emoji) => {
        setIsEmojiPickerVisible(false);
        const newMessage = {
            _id: Math.random().toString(36).substring(7),
            text: emoji,
            createdAt: new Date(),
            user: {
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }
        };
        onSend([newMessage]);
    };

    // Nút chọn Icon
    const renderActions = (props) => (
        <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
                console.log('Open emoji picker!!!!');
                //setIsEmojiPickerVisible(true);
            }}
        >
            <Ionicons name="happy-outline" size={28} color="#007bff" />
        </TouchableOpacity>
    );

    const renderSend = (props) => (
        <Send {...props}>
            <View>
                <AntDesign name="arrowright" size={17} color="#fff" />
            </View>
        </Send>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <ScrollView contentContainerStyle={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                    <Text style={{
                        marginLeft: 10,            // Khoảng cách giữa displayName và Avatar
                        fontSize: 18,               // Cỡ chữ cho tên người dùng
                        fontWeight: 'bold',         // Đậm tên người dùng
                        color: '#333',              // Màu chữ, có thể thay đổi theo màu giao diện
                        letterSpacing: 0.5,         // Khoảng cách giữa các chữ
                    }}>
                        {auth?.currentUser?.displayName}
                    </Text>
                </ScrollView>
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
            <GiftedChat
                scrollToBottom={true}
                scrollToBottomComponent={() => (
                    <AntDesign name="downcircleo" size={24} color="#007bff" />
                )}
                inverted={true}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL
                }}
                renderActions={renderActions}
                renderSend={renderSend}
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage={true}
                alwaysShowSend
            />
            // <Modal
            //     visible={isEmojiPickerVisible}
            //     animationType="slide"
            //     onRequestClose={() => setIsEmojiPickerVisible(false)}
            // >
            //     <EmojiSelector
            //         onEmojiSelected={handleEmojiSelect}
            //         showSearchBar={true}
            //         showTabs={true}
            //         showHistory={true}
            //         showSectionTitles={true}
            //         category="all"
            //         columns={8}
            //     />
            // </Modal>
    )
}

export default ChatScreen
const styles = StyleSheet.create({
    iconButton: {
        marginLeft: 10,
        marginBottom: 10,
    },
    sendButton: {
        marginRight: 10,
        marginBottom: 5,
        backgroundColor: '#007bff',
        borderRadius: 20,
        padding: 8,
    },
});