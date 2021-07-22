
import firebase from 'firebase'
import "firebase/messaging"
import "firebase/auth"


var firebaseConfig = {
    apiKey: "AIzaSyBTVOKOTbXxJXO_18Iu5GUo3rEFsFxkDCQ",
    authDomain: "enofdb-cbed7.firebaseapp.com",
    databaseURL: "https://enofdb-cbed7-default-rtdb.firebaseio.com",
    projectId: "enofdb-cbed7",
    storageBucket: "enofdb-cbed7.appspot.com",
    messagingSenderId: "195472621673",
    appId: "1:195472621673:web:fe753cec0a2352e23262f8",
    measurementId: "G-773H6D9Q5W"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;