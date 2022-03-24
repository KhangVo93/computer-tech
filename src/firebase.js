import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeDbs5ciNt5UmAZm5mnxNdzK4v1-6Sax4",
  authDomain: "devcamp-r10-8f347.firebaseapp.com",
  projectId: "devcamp-r10-8f347",
  storageBucket: "devcamp-r10-8f347.appspot.com",
  messagingSenderId: "239268509689",
  appId: "1:239268509689:web:4b0ee86a4c8f0c89872f28"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();