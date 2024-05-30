import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"; 
import { db } from "../firebase";

export const createNewEntry = async (item) => {

	try {
	const docRef = await addDoc(collection(db, "items"), item);
		console.log("Document written with ID: ", docRef.id);
		return true
	} catch (e) {
		console.error("Error adding document: ", e);
		return false
	}

}

export const getEntries = async() => {
	
	var allItems = [];

	var q = query(collection(db, "items"), orderBy('priority', 'desc'));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {

		allItems.push({...doc.data(), id: doc.id})
	});

	console.log(allItems);
	return allItems
	 
	}