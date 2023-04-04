import React from "react";
import styled from "styled-components";
import { getDatabase, ref, get, push } from "firebase/database";
import { app, db } from "../firebase";


export const getMessagesFromDatabase = async () => {
    const messagesRef = ref(db, 'messages/');
    const snapshot = await get(messagesRef);
    if (snapshot.exists()) {
        return snapshot.val();
    }
}

export const addMessageToDatabase = async (message) => {
    const messagesRef = ref(db, 'messages/');
    await push(messagesRef, message);
}
