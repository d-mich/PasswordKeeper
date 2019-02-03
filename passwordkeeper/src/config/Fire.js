import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDgbshv48FsPtB349EXKJyWWIhwdK9ohMw",
    authDomain: "passwordkeeper-f658d.firebaseapp.com",
    databaseURL: "https://passwordkeeper-f658d.firebaseio.com",
    projectId: "passwordkeeper-f658d",
    storageBucket: "passwordkeeper-f658d.appspot.com",
    messagingSenderId: "102203431113"
  };
const fire = firebase.initializeApp(config);
//google
const providerGoogle = new firebase.auth.GoogleAuthProvider();
//facebook
const providerFacebook = new firebase.auth.FacebookAuthProvider()

const auth = firebase.auth();

export {fire, providerGoogle, providerFacebook, auth}