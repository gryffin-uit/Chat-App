import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageURl, setImageUrl] = useState('');
    const updateUserProfile = async (newDisplayName, newPhotoURL) => {
        const user = auth.currentUser;
      
        if (user) {
          try {
            await updateProfile(user, {
              displayName: newDisplayName,   // Tên hiển thị mới
              photoURL: newPhotoURL ? newPhotoURL : "https://i.sstatic.net/l60Hf.png"
            });
            console.log('Profile updated successfully!');
          } catch (error) {
            console.error('Error updating profile: ', error);
          }
        } else {
          console.log('No user is currently signed in.');
        }
      };
      
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

            const user = userCredential.user;
            updateUserProfile(name, imageURl);
            
            navigation.popToTop();

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
                placeholder="Enter your image URL"
                label="Profile Picture"
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageURl.length > 50 ? `${imageURl.slice(0, 50)}...` : imageURl} // Hiển thị tối đa 50 ký tự
                onChangeText={(text) => setImageUrl(text)}
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
