import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { app, db } from "../firebase";

export const messagesCollection = collection(db, "messages");

export const getMessagesFromDatabase = async () => {
    const querySnapshot = await getDocs(messagesCollection);
    const messages = [];
    querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
};

export const subscribeToMessages = (callback) => {
    return onSnapshot(messagesCollection, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        callback(messages);
    });
};

export const addMessageToDatabase = async (message) => {
    await addDoc(messagesCollection, message);
};

