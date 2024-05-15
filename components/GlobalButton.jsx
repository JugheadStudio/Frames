import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const GlobalButton = ({ className, onPress, buttonText, style }) => {

  const styles = className === 'primary' ? primaryStyles : secondaryStyles;

  const buttonStyles = [styles.button];

  if (style) {
    buttonStyles.push(style);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const primaryStyles = StyleSheet.create({
  button: {
    backgroundColor: '#906447',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Light',
    fontSize: 20,
    color: '#F0F0F0',
  },
});

const secondaryStyles = StyleSheet.create({
  button: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Light',
    fontSize: 20,
    color: '#F0F0F0',
  },
});

export default GlobalButton;
