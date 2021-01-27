import firebase from 'firebase/app'
require("firebase/auth")
require("firebase/storage")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCyoePx3B_aJbOA9U5DuSYrEXWKJcMhuQo",
  authDomain: "nuxt-cf11d.firebaseapp.com",
  projectId: "nuxt-cf11d",
  storageBucket: "nuxt-cf11d.appspot.com",
  messagingSenderId: "1028931545805",
  appId: "1:1028931545805:web:7e8c40d4e945dd61a95784"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { firebase, db, auth, storage }