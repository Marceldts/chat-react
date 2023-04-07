import React from "react";
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const userCollection = collection(db, "users");
const storage = getStorage(app);


export const login = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
        .then((userData) => {
            const { user } = userData;
            sessionStorage.setItem('user', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                password: password,
                uid: user.uid
            })
            );
        })
    return user;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        }, reject);
    });
};

const saveUserDB = async (email, displayName, photoURL, password, uid) => {
    const path = `profilePhotos/${email}.jpg`;
    const photoRef = ref(storage, path);
    const uploadPhoto = await uploadBytes(photoRef, photoURL);
    await addDoc(userCollection, {
        email: email,
        displayName: displayName,
        photoURL: path,
        password: password,
        uid: uid
    });
};

export const getImage = async (email, id) => {
    const img = document.getElementById(id)
    const photoRef = ref(storage, `profilePhotos/${email}.jpg`);
    getDownloadURL(photoRef).then((url) => {
        img.setAttribute('src', url);
    });
}


export const register = async (email, password, displayName, photo) => {
    const userCreated = await createUserWithEmailAndPassword(auth, email, password)
        .then((userData) => {
            const { user } = userData;
            setUserData(displayName, URL.createObjectURL(photo));
            saveUserDB(email, displayName, photo, password, user.uid);
            sessionStorage.setItem('user', JSON.stringify({
                email: email,
                displayName: displayName,
                password: password,
                uid: user.uid
            }));
        })
    return userCreated;
}

export const setUserData = async (displayName, photo) => {
    const user = await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photo
    }).then(() => {
        sessionStorage.setItem('user', JSON.stringify({
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            password: auth.currentUser.password,
            uid: user.uid
        }));
    });
    return user;
}

export const logout = async () => {
    await signOut(auth).then(() => {
        sessionStorage.removeItem('user');
    });
}