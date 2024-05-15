import React from 'react';
import { Text, StyleSheet } from 'react-native';

const GlobalText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat_400Regular',
    color: '#F0F0F0',
  },
});

export default GlobalText;