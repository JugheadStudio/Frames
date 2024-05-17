import { StyleSheet, View, Text, ScrollView, SafeAreaView  } from 'react-native'
import React from 'react'

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>Profile</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

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
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
    paddingHorizontal: 25,
    position: 'relative',
  },
})