import { StyleSheet, View, Text, ScrollView, SafeAreaView  } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalText from '../components/GlobalText';

function LeaderboardScreen(){

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            <GlobalText>Leaderboard</GlobalText>
          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default LeaderboardScreen

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
    alignItems: 'center',
    paddingHorizontal: 25,
    position: 'relative',
  },
})