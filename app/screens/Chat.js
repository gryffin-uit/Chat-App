import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { auth, database } from '../config/firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { colors } from '../config/constants';
import EmojiModal from 'react-native-emoji-modal';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

function Chat({ route }) {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(database, 'chats', route.params.id), (doc) => {
            setMessages(doc.data().messages.map((message) => ({
                ...message,
                createdAt: message.createdAt.toDate(),
                image: message.image ?? '',
            })));
        });

        return () => unsubscribe();
    }, [route.params.id]);

    const onSend = useCallback(async (m = []) => {
        // Get messages
        const chatDocRef = doc(database, "chats", route.params.id);
        const chatDocSnap = await getDoc(chatDocRef);

        const chatData = chatDocSnap.data();
        const data = chatData.messages.map((message) => ({
            ...message,
            createdAt: message.createdAt.toDate(),
            image: message.image ?? "",
        }));

        // Attach new message
        const messagesWillSend = [{ ...m[0], sent: true, received: false }];
        let chatMessages = GiftedChat.append(data, messagesWillSend);

        setDoc(doc(database, 'chats', route.params.id), {
            messages: chatMessages,
            lastUpdated: Date.now()
        }, { merge: true });
    }, [route.params.id, messages]);

    const renderBubble = useMemo(() => (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: { backgroundColor: colors.primary },
                left: { backgroundColor: 'lightgrey' }
            }}
        />
    ), []);

    const renderSend = useMemo(() => (props) => (
        <Send {...props}>
            <View style={{ justifyContent: 'center', height: '100%', marginLeft: 8, marginRight: 4, marginTop: 12 }}>
                <Ionicons
                    name='send'
                    size={24}
                    color={colors.teal} />
            </View>
        </Send>
    ), []);

    const renderInputToolbar = useMemo(() => (props) => (
        <InputToolbar {...props}
            containerStyle={styles.inputToolbar}
            renderActions={renderActions}
        />
    ), []);

    const renderActions = useMemo(() => () => (
        <TouchableOpacity style={styles.emojiIcon} onPress={handleEmojiPanel}>
            <View>
                <Ionicons
                    name='happy-outline'
                    size={32}
                    color={colors.teal} />
            </View>
        </TouchableOpacity>
    ), [modal]);

    const handleEmojiPanel = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            Keyboard.dismiss();
            setModal(true);
        }
    }, [modal]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -180 : -165}
        >
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                imageStyle={{ height: 212, width: 212 }}
                messagesContainerStyle={{ backgroundColor: '#fff' }}
                textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: 'https://www.gravatar.com/avatar/?d=identicon'
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderUsernameOnMessage={true}
                renderAvatarOnTop={false}
                renderInputToolbar={renderInputToolbar}
                minInputToolbarHeight={56}
                scrollToBottom={true}
                onPressActionButton={handleEmojiPanel}
                scrollToBottomStyle={styles.scrollToBottomStyle}
            />
    
            {modal &&
                <TouchableOpacity style={styles.modalOverlay} onPress={handleEmojiPanel}>
                    <EmojiModal
                        onPressOutside={handleEmojiPanel}
                        modalStyle={styles.emojiModal}
                        containerStyle={styles.emojiContainerModal}
                        backgroundStyle={styles.emojiBackgroundModal}
                        columns={5}
                        emojiSize={66}
                        activeShortcutColor={colors.primary}
                        onEmojiSelected={(emoji) => {
                            onSend([{
                                _id: uuid.v4(),
                                createdAt: new Date(),
                                text: emoji,
                                user: {
                                    _id: auth?.currentUser?.email,
                                    name: auth?.currentUser?.displayName,
                                    avatar: 'https://www.gravatar.com/avatar/?d=identicon'
                                }
                            }]);
                        }}
                    />
                </TouchableOpacity>
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputToolbar: {
        bottom: 6,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 16,
    },
    emojiIcon: {
        marginLeft: 4,
        bottom: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    emojiModal: {},
    emojiContainerModal: {
        height: 348,
        width: 396,
    },
    emojiBackgroundModal: {},
    scrollToBottomStyle: {
        borderColor: colors.grey,
        borderWidth: 1,
        width: 56,
        height: 56,
        borderRadius: 28,
        position: 'absolute',
        bottom: 12,
        right: 12
    },
    addImageIcon: {
        bottom: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainerUpload: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: 999, 
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Chat;