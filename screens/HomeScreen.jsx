import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { auth } from '../config/firebase';
import theme from '../theme';

// Screens
import NotificationScreen from './NotificationScreen';

// Components
import EntryCard from '../components/EntryCard';

function HomeScreen(){
  
  const [userEmail, setUserEmail] = useState(null);

  const fetchUserEmail = () => {
    const user = auth.currentUser;
    if (user) {
        setUserEmail(user.email);
    }
  }

  useEffect(() => {
    fetchUserEmail();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            <EntryCard/>
            <EntryCard/>
            <EntryCard/>
            <EntryCard/>
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mb20: {
    marginBottom: 20
  },
  mb30: {
    marginBottom: 30
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  dflex: {
    display: 'flex',
    flexDirection: 'row',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  logoBar: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  topTabs: {
    justifyContent: 'center',
  },
  topTabButton: {
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 10,
    marginHorizontal: 10
  },
  topTabButtonActive: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
  },
  topTabButtonText: {
    fontSize: 18,
    color: theme.colors.text2
  },
  topTabButtonTextActive: {
    color: theme.colors.text1,
    fontFamily: theme.font.font500
  }
})