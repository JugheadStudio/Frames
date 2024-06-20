import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import theme from '../theme';

// Components
import GlobalText from '../components/GlobalText';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function EntryCard({ entryId, userID, username, profilePicture, imageUrl, likes = [], photoTitle, description, handleLikePress }) {
  const currentUserUid = auth.currentUser ? auth.currentUser.uid : 'anon';
  const isLiked = likes.includes(currentUserUid);

  const [currentLikes, setCurrentLikes] = useState(likes);
  const [postUsername, setPostUsername] = useState(username);
  const [postProfilePicture, setPostProfilePicture] = useState(profilePicture);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setCurrentLikes(likes);
    getUserDetails()
  }, [likes]);

  const handlePress = () => {
    handleLikePress(entryId);
  };

  const getUserDetails = async () => {
    try {
      const userRef = doc(db, 'users', userID);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setPostUsername(userData.username);
        setPostProfilePicture(userData.profilePicture);
      } else {
        console.log('No user data found in Firestore for UID:', userID);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.dflex, styles.profileContainer]}>
        <View style={styles.pfpContainer}>
          <Image source={{ uri: postProfilePicture }} style={styles.pfp}/>
        </View>
        <View>
          <GlobalText style={styles.username}>{postUsername}</GlobalText>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {imageLoading && <ActivityIndicator size="large" color="#ffffff" style={styles.imageLoader}/>}
        <Image source={{ uri: imageUrl }} style={styles.image} onLoad={handleImageLoad}/>
      </View>

      <View style={[styles.dflex, styles.likeTab]}>
        <TouchableOpacity style={styles.likeButtonContainer} onPress={handlePress}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={25} color={isLiked ? '#906447' : 'white'} />
        </TouchableOpacity>
        <View>
          <GlobalText>{currentLikes.length}</GlobalText>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <GlobalText style={styles.entryTitle}>{photoTitle}</GlobalText>
        <GlobalText style={styles.description}>{description}</GlobalText>
      </View>
    </View>
  );
}

export default EntryCard;

const styles = StyleSheet.create({
  dflex: {
    display: 'flex',
    flexDirection: 'row',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    marginVertical: 15
  },
  alignCenter: {
    alignItems: 'center',
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pfpContainer: {
    width: 50,
  },
  pfp: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  username: {
    fontFamily: theme.font.font700
  },
  imageContainer: {
    flex: 1,
  },
  imageLoader: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  entryTitle: {
    fontFamily: theme.font.font700,
    fontSize: 14,
    marginBottom: 10
  },
  likeTab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  likeButtonContainer: {
    marginRight: 15
  },
  descriptionContainer: {
    paddingHorizontal: 15
  },
  description: {
    fontSize: 13
  }
})