import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURl, setImageUrl] = useState('');

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name, photoURL:imageURl ? imageURl : "https://i.sstatic.net/l60Hf.png"
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });
              
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };
    
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your name"
                label="Name"
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder="Enter your image Url"
                label="Profile Picture"
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageURl}
                onChangeText={text => setImageUrl(text)}
            />

            <Button title="Register" onPress={register} style={styles.button} />
        </View>
    )
}

export default RegisterScreen
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})
