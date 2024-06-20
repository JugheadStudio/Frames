import { StyleSheet, View, ScrollView, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalText from '../components/GlobalText';
import { db } from '../config/firebase';
import theme from '../theme';
import { collection, getDoc, onSnapshot, doc as firestoreDoc } from 'firebase/firestore';

function LeaderboardScreen() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'entries'), async (snapshot) => {
      const allEntries = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const entryData = doc.data();
          const userRef = firestoreDoc(db, 'users', entryData.userID);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            return {
              id: doc.id,
              ...entryData,
              profilePicture: userData.profilePicture,
              username: userData.username,
            };
          } else {
            console.log('No user data found in Firestore for UID:', entryData.userID);
            return { id: doc.id, ...entryData };
          }
        })
      );

      // Sort entries by likes length in descending order
      allEntries.sort((a, b) => b.likes.length - a.likes.length);
      // Take top 10 entries
      const topEntries = allEntries.slice(0, 10);
      setEntries(topEntries);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {entries.map((entry, index) => (
            <View key={entry.id} style={[styles.row, index === 0 && styles.topRow]}>
              <View style={styles.column1}>
                <Image source={{ uri: entry.profilePicture }} style={styles.profilePic} />
              </View>
              <View style={styles.column2}>
                <GlobalText style={styles.photoTitle}>{entry.photoTitle}</GlobalText>
                <GlobalText>By {entry.username}</GlobalText>
              </View>
              <View style={styles.column3}>
                <GlobalText>{entry.likes.length}</GlobalText>
              </View>
            </View>
          ))}

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mb20: {
    marginBottom: 20
  },
  mb30: {
    marginBottom: 30
  },
  scrollContainer: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 25
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.dark1,
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  topRow: {
    backgroundColor: theme.colors.primary,
  },
  column1: {
    width: '15%'
  },
  column2: {
    width: '75%'
  },
  column3: {
    width: '10%',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  photoTitle: {
    fontFamily: theme.font.font700
  }
});

export default LeaderboardScreen;