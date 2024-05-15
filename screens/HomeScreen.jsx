import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../ThemeProvider';
import GlobalText from '../components/GlobalText';

function HomeScreen(){
  const theme = useTheme();

  return (
    <View>
      <GlobalText style={theme.typography.heading}>Heading test</GlobalText>
      <GlobalText style={theme.typography.body}>Body Text</GlobalText>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#ECEDEE"
  }
})