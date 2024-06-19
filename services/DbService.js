import { collection, addDoc, getDocs, query, orderBy, doc, setDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";

export const createNewEntry = async (entry) => {

	try {
	  const docRef = await addDoc(collection(db, "entries"), entry);
		console.log("Document written with ID: ", docRef.id);
		return true
	} catch (e) {
		console.error("Error adding document: ", e);
		return false
	}

}

export const createNewUser = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid); // Create a reference to the document with UID as the document ID
    await setDoc(userRef, userData); // Set the user data in this document
    console.log("User document written with ID: ", uid);
    return uid; // Return the UID as confirmation
  } catch (e) {
    console.error("Error adding user document: ", e);
    return false;
  }
}

// export const getEntries = async() => {

//   var allEntries = []

// 	const querySnapshot = await getDocs(collection(db, "entries"));

// 	querySnapshot.forEach((doc) => {
//     allEntries.push({...doc.data(), id: doc.id})
// 	});
//   return allEntries
// }

export const getEntries = async () => {
  const entriesSnapshot = await getDocs(collection(db, 'entries'));
  const entriesList = entriesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return entriesList;
};