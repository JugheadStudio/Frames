import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { createNewUser } from './DbService'; 

export const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Logged in user - ' + user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}

export const handleSignOut = () => {
  signOut(auth)
  .then(() => {
    console.log('User signed out successfully');
  })
  .catch((error) => {
    console.log('Error signing out:', error);
  });
}

export const registerUser = async (email, password, username) => {
  try {
    // Register user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user entry in Firestore
    await createNewUser(user.uid, {
      uid: user.uid,
      username: username,
      email: email,
      profilePicture: 'https://firebasestorage.googleapis.com/v0/b/frames-93ae5.appspot.com/o/placeholder.jpeg?alt=media&token=6057dfb3-f414-4fdc-9352-92fc28b310fe',  // Default or placeholder profile picture
    });

    return { success: true, userId: user.uid };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: error.message };
  }
};