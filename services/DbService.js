import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"; 
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

export const createNewUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;  // Return the document ID of the created user
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export const getEntries = async() => {
	
	var allEntries = [];

	var q = query(collection(db, "entries"), orderBy('priority', 'desc'));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {

		allEntries.push({...doc.data(), id: doc.id})
	});

	console.log(allEntries);
	return allEntries
	 
	}