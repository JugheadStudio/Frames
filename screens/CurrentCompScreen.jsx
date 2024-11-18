import { StyleSheet, View, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import GlobalText from "../components/GlobalText";
import theme from "../theme";

function CurrentCompScreen() {
  const deadline = new Date('2024-11-28T15:53:32.697Z');
  deadline.setDate(deadline.getDate() + 7);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const diff = deadline - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <GlobalText style={styles.title}>Capture the City Magic</GlobalText>
          <GlobalText style={styles.sponsor}>The sponsor of the contest is Sony</GlobalText>
          <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/frames-93ae5.appspot.com/o/sony.png?alt=media&token=68161c77-75d8-4471-bc07-dca747d89caf'}} style={styles.image} />
          <GlobalText style={styles.prizesTitle}>Prizes</GlobalText>
          <GlobalText style={styles.prizes}>A brand new Sony A1 and a 1-on-1 workshop with a Sony ambassador of your choice</GlobalText>
          <View style={styles.timerContainer}>
            <View style={styles.timerItem}>
              <GlobalText style={styles.timerNumber}>{timeLeft.days}</GlobalText>
              <GlobalText style={styles.timerLabel}>days</GlobalText>
            </View>
            <View style={styles.timerItem}>
              <GlobalText style={styles.timerNumber}>{timeLeft.hours}</GlobalText>
              <GlobalText style={styles.timerLabel}>hours</GlobalText>
            </View>
            <View style={styles.timerItem}>
              <GlobalText style={styles.timerNumber}>{timeLeft.minutes}</GlobalText>
              <GlobalText style={styles.timerLabel}>minutes</GlobalText>
            </View>
            <View style={styles.timerItem}>
              <GlobalText style={styles.timerNumber}>{timeLeft.seconds}</GlobalText>
              <GlobalText style={styles.timerLabel}>seconds</GlobalText>
            </View>
          </View>
          <GlobalText style={styles.prizesTitle}>Theme</GlobalText>
          <GlobalText style={styles.theme}>Cityscapes</GlobalText>
          <GlobalText style={styles.info}>
            This competition focuses on capturing the beauty of urban landscapes. We chose cityscapes as the theme to showcase the diversity and vibrancy of city life.
            To enter, upload an image of a cityscape. The winner will be determined by the entry with the most likes.
          </GlobalText>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

export default CurrentCompScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.font.font700,
    marginBottom: 10,
    textAlign: "center",
  },
  sponsor: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  prizesTitle: {
    fontFamily: theme.font.font700,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15
  },
  prizes: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 35,
    marginBottom: 35
  },
  timerItem: {
    alignItems: "center",
    marginHorizontal: 15
  },
  timerNumber: {
    fontSize: 40,
    fontFamily: theme.font.font700,
    color: theme.colors.primary
  },
  timerLabel: {
    fontSize: 14,
  },
  theme: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    textAlign: "center",
  },
});