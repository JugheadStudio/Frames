import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLoading from 'expo-app-loading';

import { ThemeProvider } from './ThemeProvider';

import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

import HomeScreen from './screens/HomeScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitleStyle: {
        fontFamily: 'Montserrat_500Medium',
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-outline' : 'home-outline';
        } else if (route.name === 'Development') {
          iconName = focused ? 'code-outline' : 'code-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: MyTheme.colors.iconActive,
      tabBarInactiveTintColor: MyTheme.colors.iconDefault,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Development" component={DevelopmentScreen} />
    </Tab.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    background: '#0B0B0B',
    card: '#040404',
    text: '#F0F0F0',
    border: 'transparent',
    notification: 'rgb(255, 69, 58)',
    iconDefault: '#F0F0F0',
    iconActive: '#906447',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false);


  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      <ThemeProvider>
        <NavigationContainer theme={MyTheme}>
          {!isLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator screenOptions={({ route }) => ({
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontFamily: 'Montserrat_500Medium',
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home-outline' : 'home-outline';
                } else if (route.name === 'Development') {
                  iconName = focused ? 'code-outline' : 'code-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: MyTheme.colors.iconActive,
              tabBarInactiveTintColor: MyTheme.colors.iconDefault,
            })}>
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Tab.Screen name="Development" component={DevelopmentScreen} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </ThemeProvider>

    );
  }
}
