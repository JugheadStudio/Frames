import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { handleSignOut } from '../services/authService';
import { auth } from '../config/firebase';

// Components
import { useTheme } from '../ThemeProvider';
import GlobalText from '../components/GlobalText';
import GlobalButton from '../components/GlobalButton';

function SettingsScreen() {

  const [userEmail, setUserEmail] = useState(null);

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

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            <GlobalButton className="secondary" buttonText="Sign Out" onPress={handleLogout} />
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 15
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    position: 'relative',
  },
})