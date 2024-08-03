// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6UCd2lCJXXAgAoahtG4vrr4bQ02xuktA",
    authDomain: "my-chat-app-efddd.firebaseapp.com",
    projectId: "my-chat-app-efddd",
    storageBucket: "my-chat-app-efddd.appspot.com",
    messagingSenderId: "1078139911334",
    appId: "1:1078139911334:web:087963ce69e3d9128fc867"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence:  getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
