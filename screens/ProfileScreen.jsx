import { StyleSheet, View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../ThemeProvider';
import GlobalText from '../components/GlobalText';

import { handleSignOut } from '../services/authService';
import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

function ProfileScreen({ route, navigation }) {

  const [userEmail, setUserEmail] = useState(null);
  // const { itemId, itemdTitle, itemdDescription } = route.params;

  const theme = useTheme();

  const handleLogout = () => {
    handleSignOut()
  }

  const fetchUserEmail = () => {
    const user = auth.currentUser; // Get the current user
    if (user) {
      setUserEmail(user.email); // Set user email in state
    }
  }

  useEffect(() => {
    fetchUserEmail();
  }, []);

  // const handleDelete = async () => {
  //   const itemRef = doc(db, "items", itemId);
  //   await deleteDoc(itemRef);
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.profileContainer}>
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/pfp.png')} style={styles.image} />
            </View>

            <View style={styles.profileDetails}>
              <GlobalText style={styles.username}>Ruan Jordaan</GlobalText>
            </View>
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

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
    paddingHorizontal: 25,
  },
  profileContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    paddingHorizontal: 15,
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
  }
})