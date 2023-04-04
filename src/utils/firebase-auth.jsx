import React from "react";
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../firebase-config";

export const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
        .then((userData) => {
            const { user } = userData;
            sessionStorage.setItem('user', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            })
            );
        })
    return user;
}

export const register = async (email, password, username, photo) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then((userData) => {
            const { user } = userData;
            user.updateProfile({
                displayName: username,
                photoURL: photo
            });
            sessionStorage.setItem('user', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
        })
    return user;
}

export const logout = async () => {
    await signOut(auth).then(() => {
        sessionStorage.removeItem('user');
    });
}