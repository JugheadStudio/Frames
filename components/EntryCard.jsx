import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import theme from '../theme';

// Components
import GlobalText from '../components/GlobalText';

function EntryCard({ username, profilePicture, imageUrl, likes, photoTitle, description }) {
  return (
    <View style={styles.container}>
      <View style={[styles.dflex, styles.profileContainer]}>
        <View style={styles.pfpContainer}>
          <Image source={{ uri: profilePicture }} style={styles.pfp}/>
        </View>
        <View>
          <GlobalText style={styles.username}>{username}</GlobalText>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image}/>
      </View>

      <View style={[styles.dflex, styles.likeTab]}>
        <View style={styles.likeButtonContainer}>
          <Ionicons name={'heart-outline'} size={25} color={'white'} />
        </View>
        <View>
          <GlobalText>{likes}</GlobalText>
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
  image: {
    width: '100%', // Image takes full width of its container
    aspectRatio: 1, // Maintain the aspect ratio of 1:1
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