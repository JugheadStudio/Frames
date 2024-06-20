import { StyleSheet, View, TextInput, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalText from "../components/GlobalText";

function PastCompScreen() {

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          <GlobalText>PastCompScreen</GlobalText>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default PastCompScreen;

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
});