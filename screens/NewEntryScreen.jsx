import { StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalText from '../components/GlobalText';

import theme from '../theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';

import {handleSignOut} from '../services/authService';
import { auth } from '../config/firebase';
import GlobalButton from '../components/GlobalButton';
import { createNewEntry } from '../services/DbService'

const IMAGE_SVG = `
<svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 65H57C61.4183 65 65 61.4183 65 57V9C65 4.58172 61.4183 1 57 1H9C4.58172 1 1 4.58172 1 9L1 57C1 61.4183 4.58172 65 9 65Z" stroke="#906447" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M45 29C49.4183 29 53 25.4183 53 21C53 16.5817 49.4183 13 45 13C40.5817 13 37 16.5817 37 21C37 25.4183 40.5817 29 45 29Z" stroke="#906447" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1 41.9901L5.69 37.5001C11.94 31.5101 22.07 31.5101 28.32 37.5001L57.01 65.0101" stroke="#906447" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;



function NewEntryScreen(){

  const [photoTitle, setPhotoTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [isActivePhotoTitle, setActivephotoTitle] = useState(false);
  const [isActiveDescription, setActiveDescription] = useState(false);

  const submit = () => {

    var items = {image, photoTitle, description}
  
    var success = createNewEntry(items);
    if (success) {
      navigation.goBack();
    } else {
      // Validation on why
    }

    setPhotoTitle('');
    setDescription('');
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.imageContainer}>
          <View style={styles.imageUploadContainer}>
            <SvgXml xml={IMAGE_SVG}/>
            <GlobalText style={{color: theme.colors.text2, marginTop: 15}}>Upload Photo</GlobalText>
          </View>
        </View>

        <View style={styles.container}>
          <GlobalText style={styles.label}>Title</GlobalText>

          <TextInput
            style={[isActivePhotoTitle ? styles.textFieldActive : styles.textField, styles.mb20] } onFocus={() => setActivephotoTitle(true)} onBlur={() => setActivephotoTitle(false)}
            placeholder="Add a title..."
            placeholderTextColor="#848484"
            onChangeText={newText => setPhotoTitle(newText)}
            defaultValue={photoTitle}
            maxLength={30}
          />

          <GlobalText style={styles.label}>Description</GlobalText>

          <TextInput
            multiline
            style={[isActiveDescription ? styles.textFieldActive : styles.textField, styles.mb20, styles.descriptionInput] } onFocus={() => setActiveDescription(true)} onBlur={() => setActiveDescription(false)}
            placeholder="Write a caption..."
            placeholderTextColor="#848484"
            onChangeText={newText => setDescription(newText)}
            defaultValue={description}
            numberOfLines={4}
            maxLength={200}
          />

          <GlobalButton className="primary" buttonText="Submit" style={{ marginBottom: 20 }} onPress={submit} />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default NewEntryScreen

const styles = StyleSheet.create({
  mb20: {
    marginBottom: 20
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  imageContainer: {
    flex: 1,
  },
  imageUploadContainer: {
    height: 350,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.dark1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: '#B9B8B6',
    width: '100%',
    textAlign: 'left'
  },
  textField: {
    borderColor: '#8C8C8C',
    backgroundColor: '#0B0B0B',
    color: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  textFieldActive: {
    borderColor: '#906447',
    backgroundColor: '#0B0B0B',
    color: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  descriptionInput: {
    minHeight: 100,
  }
})