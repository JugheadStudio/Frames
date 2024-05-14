import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import PhotoScreen from './screens/PhotosScreen';
import PrivateScreen from './screens/PrivateScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'Development') {
            iconName = focused ? 'code-outline' : 'code-outline';
          } else if (route.name === 'Photos') {
            iconName = focused ? 'image-outline' : 'image-outline';
          } else if (route.name === 'Private') {
            iconName = focused ? 'accessibility-outline' : 'accessibility-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Development" component={DevelopmentScreen} />
        <Tab.Screen name="Photos" component={PhotoScreen} />
        <Tab.Screen name="Private" component={PrivateScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
