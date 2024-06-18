import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const handleUploadOfImage = async (uri, fileName) => {
  try {
    console.log("Uploading image...");

    // Manipulate the image: resize and compress
    const manipulatedImage = await manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Example resize to width of 800 pixels
      { compress: 0.75, format: SaveFormat.JPEG }
    );

    // Create a blob from the manipulated image URI using XMLHttpRequest
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.error(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", manipulatedImage.uri, true);
      xhr.send(null);
    });

    // Reference to the Firebase Storage location
    const storageRef = ref(storage, fileName);

    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Close the blob once it's uploaded
    blob.close();

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded. Download URL:", downloadURL);

    return downloadURL; // Return the download URL

  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};