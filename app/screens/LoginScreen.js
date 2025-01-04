import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Input, Button } from 'react-native-elements';
import {auth} from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useEffect, useState} from 'react';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        navigation.replace('Chat');
      } else {
        // User is signed out
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubcribe;
  }, []);
  return (
    <View style={styles.container}>
      <Input 
        placeholder='Enter your Email'
        label='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input 
        placeholder='Enter your Password'
        label='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title='Login' onPress={signIn} buttonStyle={styles.button} />
      <Button title='Register' buttonStyle={styles.button} onPress={()=>navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
  },
});

export default LoginScreen;