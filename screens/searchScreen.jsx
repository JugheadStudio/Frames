import { StyleSheet, View, TextInput, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";
import GlobalText from "../components/GlobalText";

import { handleSignOut } from "../services/authService";
import { auth } from "../config/firebase";

function SearchScreen() {

  const [search, setSearch] = useState('');

  const [isActiveSearch, setActiveSearch] = useState(false);

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[isActiveSearch ? styles.textFieldActive : styles.textField, styles.mb20]} onFocus={() => setActiveSearch(true)} onBlur={() => setActiveSearch(false)}
              placeholder="Search..."
              placeholderTextColor="#848484"
              onChangeText={newText => setSearch(newText)}
              defaultValue={search}
            />
          </View>

          <View style={styles.imageContainer}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={require('../assets/pfp.png')} style={styles.image} />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
  searchContainer: {
    marginHorizontal: 15,
  },
  textField: {
    borderColor: '#8C8C8C',
    backgroundColor: '#0B0B0B',
    color: 'white',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  textFieldActive: {
    borderColor: '#906447',
    backgroundColor: '#0B0B0B',
    color: 'white',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  imageWrapper: {
    width: '33.2%', // Adjust based on your desired spacing
    aspectRatio: 1, // Aspect ratio 1:1 for square images
    marginBottom: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});