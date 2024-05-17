import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

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

export const handleRegister = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User created - ' + user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error creating user - ') + errorMessage;
  });
}