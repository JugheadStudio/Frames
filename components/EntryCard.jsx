import { StyleSheet, View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {handleSignOut} from '../services/authService';
import { auth } from '../config/firebase';
import theme from '../theme';

// Components
import GlobalText from '../components/GlobalText';

function EntryCard(){
  
  const [userEmail, setUserEmail] = useState(null);

  const fetchUserEmail = () => {
    const user = auth.currentUser; // Get the current user
    if (user) {
        setUserEmail(user.email); // Set user email in state
    }
  }

  useEffect(() => {
    fetchUserEmail();
  }, []);

  return (
    <View style={styles.container}>

      <View style={[styles.dflex, styles.profileContainer]}>
        <View style={styles.pfpContainer}>
          <Image source={require('../assets/pfp.png')} style={styles.pfp}/>
        </View>
        <View>
          <GlobalText style={styles.username}>Username</GlobalText>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/post.jpg')} style={styles.image}/>
      </View>

      <View style={[styles.dflex, styles.likeTab]}>
        <View style={styles.likeButtonContainer}>
          <Ionicons name={'heart-outline'} size={25} color={'white'} />
        </View>
        <View>
          <GlobalText>100</GlobalText>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <GlobalText style={styles.entryTitle}>Rock Chilling In The Middle</GlobalText>
        <GlobalText style={styles.description}>This shot was taken while on a hike in Kaapsehoek near the little town. I saw this little gem and just knew I had to take a shot with the landscape in the background.</GlobalText>
      </View>
    </View>
  )
}

export default EntryCard

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
  image: {
    width: '100%',
    height: 500,
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