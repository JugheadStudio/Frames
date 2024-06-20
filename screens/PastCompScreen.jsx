import { StyleSheet, View, TextInput, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalText from "../components/GlobalText";
import theme from "../theme";

function PastCompScreen() {

  const competitions = [
    {
      title: "Enchanted Forest Exploration",
      theme: "Fantasy",
      endDate: "2022-08-15",
      winner: "Aria Nightshade",
      sponsor: "Mystical Adventures Inc.",
      prize: "Magical Retreat in the Woods"
    },
    {
      title: "Galactic Wonders Capture",
      theme: "Space",
      endDate: "2022-09-20",
      winner: "Cosmo Voyager",
      sponsor: "Stellar Explorations Agency",
      prize: "Astronomical Observatory Tour"
    },
    {
      title: "Underwater Symphony",
      theme: "Ocean Life",
      endDate: "2022-10-10",
      winner: "Marina Diver",
      sponsor: "Deep Blue Expeditions",
      prize: "Dive with Marine Biologists"
    },
    {
      title: "Urban Jungle Safari",
      theme: "City Wildlife",
      endDate: "2022-11-05",
      winner: "Leo Urbanus",
      sponsor: "Concrete Jungle Tours",
      prize: "Wildlife Photography Workshop"
    },
    {
      title: "Time Travel Chronicles",
      theme: "Historical Moments",
      endDate: "2022-12-20",
      winner: "Chrono Historian",
      sponsor: "Temporal Adventures Society",
      prize: "Historical Site Exploration"
    }
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {competitions.map((competition, index) => (
          <View key={index} style={styles.card}>
            <GlobalText style={styles.title}>{competition.title}</GlobalText>
            <GlobalText style={styles.subtitle}>Theme: {competition.theme}</GlobalText>
            <GlobalText style={styles.text}>End Date: {competition.endDate}</GlobalText>
            <GlobalText style={styles.text}>Winner: {competition.winner}</GlobalText>
            <GlobalText style={styles.text}>Sponsor: {competition.sponsor}</GlobalText>
            <GlobalText style={styles.text}>Prize: {competition.prize}</GlobalText>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

export default PastCompScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  wrapper: {
    flex: 1,
  },
  card: {
    width: "100%",
    // backgroundColor: "#000",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.font.font600,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 3,
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
});