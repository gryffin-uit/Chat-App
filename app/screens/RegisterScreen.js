import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { colors } from '../config/constants';
import { doc, setDoc } from 'firebase/firestore';
const backImage = require("../../assets/images/background.png");

export default function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const onHandleSignup = () => {
        if (email !== '' && password !== '' && username !== '' && password === retypePassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    updateProfile(cred.user, { displayName: username }).then(() => {
                        setDoc(doc(database, 'users', cred.user.email), {
                            id: cred.user.uid,
                            email: cred.user.email,
                            name: cred.user.displayName,
                            about: 'Available'
                        })
                    })
                    console.log('Signup success: ' + cred.user.email)
                    Alert.alert('Signup success', 'You have successfully signed up');

                    setTimeout(() => {
                        navigation.navigate('Login');
                    }, 3000); // 3 seconds delay
                })
                .catch((err) => Alert.alert("Signup error", err.message));
        }
        else {
            if (password !== retypePassword) {
                Alert.alert("Signup error", "Passwords do not match");
            }
            else {
                Alert.alert("Signup error", "Please fill in all fields");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    keyboardType="name-phone-pad"
                    textContentType="name"
                    autoFocus={true}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Retype password"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={retypePassword}
                    onChangeText={(text) => setRetypePassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Sign Up</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: colors.pink, fontWeight: '600', fontSize: 14 }}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "center",
        paddingTop: 40,
        paddingBottom: 30,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '82%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: colors.primary,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});