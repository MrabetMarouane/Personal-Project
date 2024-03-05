// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo9d7pb7sf3PuSWDWYtSrdMEx9mjUfAVg",
  authDomain: "rechargehub-94a85.firebaseapp.com",
  projectId: "rechargehub-94a85",
  storageBucket: "rechargehub-94a85.appspot.com",
  messagingSenderId: "540530082373",
  appId: "1:540530082373:web:e77f9e3cf80b88d136192c",
  measurementId: "G-25WBJEQWFR"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase};