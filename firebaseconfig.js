import firebase from 'firebase'
import 'firebase/firestore'

const config = {
        apiKey: "AIzaSyDxeR7V-zePLaCAI1GiyaVVT8Til7f0vkY",
        authDomain: "url-shortener-dbe06.firebaseapp.com",
        databaseURL: "https://url-shortener-dbe06.firebaseio.com",
        projectId: "url-shortener-dbe06",
        storageBucket: "url-shortener-dbe06.appspot.com",
        messagingSenderId: "311532624894"
}

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db
