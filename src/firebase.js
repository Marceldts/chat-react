import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCmsojfgN1JlDQgRoeFi7bEmyR1ZZXEUdQ",
  authDomain: "chat-en-react.firebaseapp.com",
  projectId: "chat-en-react",
  storageBucket: "chat-en-react.appspot.com",
  messagingSenderId: "177596954611",
  appId: "1:177596954611:web:0c77bdc72c0af16b018486",
  databaseURL:
    "https://chat-en-react-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { app, db };
