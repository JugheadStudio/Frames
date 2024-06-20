import { StyleSheet, View, ScrollView, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalText from '../components/GlobalText';
import GlobalButton from '../components/GlobalButton';

import * as ImagePicker from 'expo-image-picker';
import { handleUploadOfImage } from '../services/BucketServices';

import { handleSignOut } from '../services/authService';
import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

function ProfileScreen({ route, navigation }) {
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    handleSignOut();
  };

  const getUserDetails = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsername(userData.username);
        setProfilePic(userData.profilePicture);
      } else {
        console.log('No user data found in Firestore for UID:', auth.currentUser.uid);
      }
    }
  };

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        try {
          const imageUrl = await handleUploadOfImage(uri, `profile_${auth.currentUser.uid}.jpg`);
          setProfilePic(imageUrl); // Update local state to reflect new profile picture
          await updateProfilePicture(imageUrl); // Update Firestore
        } catch (error) {
          console.error("Failed to upload image and update profile:", error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        console.error("No URI found in the image result");
        setLoading(false); // End loading
      }
    } else {
      console.error("Image picking was canceled or no assets found");
      setLoading(false); // End loading
    }
  };

  const updateProfilePicture = async (imageUrl) => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      try {
        await updateDoc(userRef, {
          profilePicture: imageUrl
        });
        console.log('Profile picture updated successfully');
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
              {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <Image source={{ uri: profilePic }} style={styles.image} />
              )}
            </TouchableOpacity>
            <View style={styles.profileDetails}>
              <GlobalText style={styles.username}>{username}</GlobalText>
            </View>
            <View style={styles.button}>
              <GlobalButton className="secondary" buttonText="Sign Out" onPress={handleLogout} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 15
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center'
  },
  imageWrapper: {
    width: 75,
    aspectRatio: 1,
    marginBottom: 1,
    // marginRight: 25
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  username: {
    // fontFamily: 'Montserrat_700Bold',
    marginTop: 15,
    fontSize: 18
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 50
  },
})