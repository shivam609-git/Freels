import firebase from "firebase/app";

import "firebase/firestore";

//Step 1
import "firebase/auth";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDml46AHWgfTb-v4t5hP62fWIkErFsJ3xg",
  authDomain: "reels-3db9a.firebaseapp.com",
  projectId: "reels-3db9a",
  storageBucket: "reels-3db9a.appspot.com",
  messagingSenderId: "234845926501",
  appId: "1:234845926501:web:4851125f41925ca8e1828c"
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

//Step 2
export const auth = firebase.auth();

export const storage = firebase.storage()

//Step 3=> firebase console; enable google login in auth panel

//Step 4
let provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;