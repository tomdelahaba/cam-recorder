// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return userRef;
};

export const uploadBlobFile = (blob, user) => {
  const { id } = user;
  const storage = getStorage();
  const storageRef = ref(storage, `video_${id}`);
  const uploadTask = uploadBytesResumable(storageRef, blob);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

export const downloadBlobFile = async (user) => {
  const { id } = user;
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `video_${id}`);
    let blob = await getBlob(fileRef);
    return blob;
  } catch (error) {
    switch (error.code) {
      case "storage/object-not-found":
        console.log("File not exist");
        throw new Error(error.message);
      default:
        console.log(error.message);
        break;
    }
  }
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default firebase;
