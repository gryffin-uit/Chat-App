import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDkGZQPmFPVsSLEth7BuCj0-MveqKP9mEA",
    authDomain: "chat-app-b9d5a.firebaseapp.com",
    projectId: "chat-app-b9d5a",
    storageBucket: "chat-app-b9d5a.firebasestorage.app",
    messagingSenderId: "127269026077",
    appId: "1:127269026077:web:8727f294e7f7961a1849f4",
    measurementId: "G-6BVW1JCSDV"
  };
  

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };