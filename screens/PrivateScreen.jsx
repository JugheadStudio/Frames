import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

function PrivateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Private</Text>
    </View>
  )
}

export default PrivateScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#151718"
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#ECEDEE"
  }
})