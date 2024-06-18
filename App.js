import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeProvider } from "./ThemeProvider";
import { SvgXml } from "react-native-svg";

// Screens ----------------------------------
import NotificationScreen from "./screens/NotificationScreen";
import NewEntryScreen from "./screens/NewEntryScreen";
import SearchScreen from "./screens/SearchScreen";

import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/infoScreen";

import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

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
} from "@expo-google-fonts/montserrat";
import theme from "./theme";

const LOGO_SVG = `
<svg width="150" height="23" viewBox="0 0 243 37" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M113.349 34.3343L113.349 32.9039L112.182 32.7743C110.685 32.6086 108.454 31.9582 107.199 31.3223C106.659 31.0485 105.095 30.0608 103.723 29.1274C99.6538 26.3578 97.7276 25.5644 95.0736 25.5644C92.356 25.5644 90.4123 26.3952 86.5783 29.1952C83.9312 31.1285 82.5488 31.9213 81.0762 32.3502C80.4696 32.527 79.8986 32.6716 79.807 32.6716C79.7156 32.6716 79.6409 31.8659 79.6409 30.8812L79.6409 29.0906L80.8085 28.7273C82.4178 28.2268 84.7916 27.0098 87.3408 25.3786C91.6427 22.6259 92.9055 22.0907 95.1179 22.0819C97.3962 22.073 98.5618 22.5937 103.234 25.7084C105.081 26.939 107.045 28.0735 107.905 28.4063C109.312 28.9505 109.737 29.039 112.283 29.3193L113.349 29.4366L113.349 24.8751L113.349 20.3137L112.182 20.083C109.36 19.526 107.88 18.8447 104.211 16.4151C100.147 13.7235 97.768 12.7716 95.1063 12.7716C92.5983 12.7716 90.5451 13.6216 86.2404 16.4423C83.3161 18.3586 80.7986 19.6757 80.0604 19.6757C79.6698 19.6757 79.6409 19.5583 79.6409 17.9655L79.6409 16.2551L80.4024 16.0082C81.6543 15.6021 84.2139 14.256 86.7422 12.6737C91.283 9.83206 92.9169 9.21943 95.5806 9.35913C97.6969 9.47021 99.1754 10.147 103.551 13.0077C105.288 14.1435 107.365 15.3271 108.165 15.6378C109.57 16.1832 111.633 16.6251 112.791 16.6281L113.349 16.6297L113.349 12.0787L113.349 7.52772L112.497 7.38375C110.338 7.01884 108.093 5.96211 104.516 3.62549C101.536 1.67914 99.4699 0.680486 97.606 0.285535C93.8038 -0.519808 91.0193 0.285738 85.1236 3.89637C82.0281 5.79216 79.8436 6.79832 78.1442 7.11124L76.7489 7.36811L76.8525 8.65979C76.9095 9.3703 77.0115 10.0067 77.0791 10.0743C77.311 10.3062 79.9638 9.70352 81.5787 9.0519C82.4675 8.6935 84.7804 7.45137 86.7186 6.29148C94.2729 1.77154 96.3261 1.73498 102.895 6.00212C105.961 7.99456 107.274 8.70974 109.18 9.42533L110.405 9.88506L110.463 11.633C110.5 12.7135 110.444 13.3808 110.317 13.3808C109.75 13.3808 107.526 12.1701 104.709 10.3285C99.9026 7.18597 98.0407 6.45231 94.8864 6.45738C91.9761 6.46185 89.833 7.29846 85.2251 10.228C82.1806 12.1638 80.3084 13.0782 78.3937 13.5641L76.8996 13.9434L76.845 18.4342L76.7903 22.9247L77.8786 22.9247C80.5271 22.9247 83.4666 21.7205 87.7634 18.8752C91.9036 16.1337 93.5689 15.4721 95.804 15.6808C97.6092 15.8494 99.1232 16.5371 102.425 18.688C105.65 20.7893 107.518 21.7828 109.248 22.3173L110.405 22.6747L110.463 24.4243C110.499 25.4958 110.443 26.1736 110.319 26.1736C109.581 26.1736 107.42 25.0347 104.667 23.1943C99.7101 19.881 98.0905 19.1993 95.1751 19.1993C92.4492 19.1993 90.1808 20.1025 85.8343 22.9179C82.6787 24.9622 80.5545 25.9551 78.5119 26.3408L76.7981 26.6642L76.7981 31.1909L76.7981 35.7175L77.897 35.7175C81.1194 35.7175 84.3444 34.437 88.068 31.6794C92.2787 28.561 94.3602 27.9043 97.251 28.7824C98.2935 29.0991 99.4808 29.7599 101.835 31.3334C103.581 32.5014 105.586 33.7316 106.289 34.067C107.857 34.8153 110.153 35.4452 111.978 35.6278L113.349 35.7648L113.349 34.3343Z" fill="#906447"/>
  <path d="M228.856 18.7568C230.926 18.7568 232.702 18.842 234.183 19.0123C235.663 19.1827 236.908 19.4382 237.917 19.7789C238.939 20.1065 239.752 20.5192 240.354 21.0171C240.957 21.5151 241.422 22.0851 241.75 22.7271C242.077 23.3561 242.287 24.0637 242.379 24.8499C242.484 25.6361 242.536 26.4878 242.536 27.405C242.536 28.3223 242.451 29.1871 242.28 29.9995C242.123 30.7988 241.835 31.5326 241.416 32.2009C240.996 32.8692 240.426 33.4654 239.706 33.9895C238.985 34.5136 238.068 34.9592 236.954 35.326C235.84 35.6929 234.497 35.9681 232.925 36.1516C231.365 36.3481 229.537 36.4464 227.441 36.4464H222.409C220.522 36.4464 218.871 36.3743 217.456 36.2302C216.041 36.086 214.822 35.8698 213.8 35.5816C212.778 35.2802 211.933 34.9067 211.265 34.4612C210.596 34.0026 210.059 33.4719 209.653 32.8692C209.26 32.2533 208.985 31.5588 208.828 30.7857C208.67 29.9995 208.592 29.1347 208.592 28.1912H212.365C212.365 29.3706 212.536 30.2943 212.876 30.9626C213.217 31.6309 213.781 32.1354 214.567 32.4761C215.353 32.8036 216.382 33.0133 217.653 33.105C218.937 33.1836 220.522 33.223 222.409 33.223H227.441C229.642 33.223 231.47 33.1181 232.925 32.9085C234.379 32.6988 235.539 32.3647 236.404 31.9061C237.268 31.4474 237.878 30.8512 238.232 30.1174C238.585 29.3706 238.762 28.4664 238.762 27.405C238.762 26.3437 238.638 25.4592 238.389 24.7516C238.153 24.044 237.675 23.4806 236.954 23.0613C236.246 22.642 235.244 22.3471 233.947 22.1768C232.65 21.9933 230.953 21.9016 228.856 21.9016H223.667C221.361 21.9016 219.382 21.8164 217.731 21.6461C216.093 21.4758 214.718 21.2333 213.604 20.9189C212.49 20.5913 211.599 20.1916 210.931 19.7199C210.262 19.2351 209.751 18.6847 209.398 18.0689C209.057 17.453 208.834 16.7716 208.729 16.0247C208.624 15.2647 208.572 14.4458 208.572 13.5679C208.572 12.6506 208.651 11.7989 208.808 11.0127C208.978 10.2265 209.286 9.51891 209.732 8.88995C210.177 8.24788 210.786 7.67788 211.56 7.17995C212.333 6.68202 213.322 6.26927 214.528 5.94168C215.746 5.60099 217.207 5.34548 218.911 5.17513C220.614 5.00479 222.619 4.91962 224.925 4.91962H228.699C230.586 4.91962 232.237 4.99169 233.652 5.13582C235.067 5.26686 236.286 5.48306 237.308 5.78444C238.33 6.07272 239.175 6.43961 239.843 6.88513C240.525 7.31754 241.062 7.84167 241.455 8.45753C241.861 9.06029 242.143 9.74822 242.3 10.5213C242.457 11.2944 242.536 12.1527 242.536 13.0961H238.762C238.762 11.9168 238.592 10.993 238.251 10.3248C237.911 9.6565 237.347 9.15857 236.561 8.83098C235.775 8.49029 234.739 8.28064 233.455 8.20202C232.171 8.11029 230.586 8.06443 228.699 8.06443H224.925C222.409 8.06443 220.339 8.15616 218.714 8.3396C217.089 8.50995 215.805 8.80477 214.862 9.22408C213.918 9.64339 213.263 10.2068 212.896 10.9144C212.529 11.622 212.346 12.5065 212.346 13.5679C212.346 14.223 212.392 14.8061 212.483 15.3172C212.575 15.8282 212.759 16.2803 213.034 16.6734C213.322 17.0534 213.722 17.3744 214.233 17.6365C214.744 17.8985 215.419 18.1147 216.257 18.2851C217.096 18.4554 218.118 18.5799 219.323 18.6585C220.542 18.724 221.99 18.7568 223.667 18.7568H228.856Z" fill="#B9B8B6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M242.53 12.6321C242.534 12.7844 242.536 12.9391 242.536 13.0961H238.762C238.762 11.9168 238.592 10.993 238.251 10.3248C237.911 9.65649 237.347 9.15856 236.561 8.83097C235.775 8.49028 234.74 8.28063 233.455 8.20201C232.171 8.11029 230.586 8.06442 228.699 8.06442H224.925C222.409 8.06442 220.339 8.15615 218.714 8.33959C217.089 8.50994 215.805 8.80477 214.862 9.22407C213.918 9.64338 213.263 10.2068 212.896 10.9144C212.529 11.622 212.346 12.5065 212.346 13.5678C212.346 14.223 212.392 14.8061 212.483 15.3172C212.575 15.8282 212.759 16.2803 213.034 16.6734C213.322 17.0534 213.722 17.3744 214.233 17.6365C214.744 17.8985 215.419 18.1147 216.257 18.2851C217.096 18.4554 218.118 18.5799 219.323 18.6585C220.542 18.724 221.99 18.7568 223.667 18.7568H228.856C230.927 18.7568 232.702 18.842 234.183 19.0123C235.663 19.1827 236.908 19.4382 237.917 19.7789C238.939 20.1064 239.752 20.5192 240.354 21.0171C240.957 21.5151 241.422 22.0851 241.75 22.7271C242.078 23.3561 242.287 24.0637 242.379 24.8499C242.484 25.6361 242.536 26.4878 242.536 27.405C242.536 28.3223 242.451 29.1871 242.281 29.9995C242.123 30.7988 241.835 31.5326 241.416 32.2009C240.996 32.8692 240.426 33.4654 239.706 33.9895C238.985 34.5136 238.068 34.9591 236.954 35.326C235.84 35.6929 234.497 35.9681 232.925 36.1516C231.365 36.3481 229.538 36.4464 227.441 36.4464H222.409C220.522 36.4464 218.871 36.3743 217.456 36.2302C216.041 36.086 214.822 35.8698 213.8 35.5816C212.778 35.2802 211.933 34.9067 211.265 34.4612C210.597 34.0026 210.059 33.4719 209.653 32.8692C209.26 32.2533 208.985 31.5588 208.828 30.7857C208.697 30.1302 208.62 29.42 208.598 28.6552C208.594 28.5027 208.592 28.3481 208.592 28.1912H212.366C212.366 29.3705 212.536 30.2943 212.877 30.9626C213.217 31.6309 213.781 32.1354 214.567 32.4761C215.353 32.8036 216.382 33.0133 217.653 33.105C218.937 33.1836 220.522 33.2229 222.409 33.2229H227.441C229.642 33.2229 231.47 33.1181 232.925 32.9085C234.379 32.6988 235.539 32.3647 236.404 31.906C237.269 31.4474 237.878 30.8512 238.232 30.1174C238.585 29.3705 238.762 28.4664 238.762 27.405C238.762 26.3437 238.638 25.4592 238.389 24.7516C238.153 24.044 237.675 23.4806 236.954 23.0613C236.247 22.642 235.244 22.3471 233.947 22.1768C232.65 21.9933 230.953 21.9016 228.856 21.9016H223.667C221.361 21.9016 219.382 21.8164 217.731 21.6461C216.093 21.4757 214.718 21.2333 213.604 20.9189C212.49 20.5913 211.599 20.1916 210.931 19.7199C210.262 19.2351 209.751 18.6847 209.398 18.0689C209.057 17.453 208.834 16.7716 208.729 16.0247C208.625 15.2647 208.572 14.4458 208.572 13.5678C208.572 12.6506 208.651 11.7989 208.808 11.0127C208.978 10.2265 209.286 9.5189 209.732 8.88994C210.177 8.24787 210.787 7.67787 211.56 7.17994C212.333 6.68202 213.322 6.26926 214.528 5.94167C215.746 5.60098 217.207 5.34547 218.911 5.17513C220.614 5.00478 222.619 4.91961 224.925 4.91961H228.699C230.586 4.91961 232.237 4.99168 233.652 5.13582C235.067 5.26685 236.286 5.48306 237.308 5.78443C238.33 6.07271 239.175 6.4396 239.843 6.88512C240.525 7.31753 241.062 7.84167 241.455 8.45753C241.861 9.06028 242.143 9.74821 242.3 10.5213C242.431 11.1657 242.508 11.8694 242.53 12.6321ZM241.843 8.20302C242.284 8.85926 242.587 9.60322 242.755 10.4288C242.919 11.2376 243 12.1275 243 13.0961V13.5601H238.298V13.0961C238.298 11.9524 238.132 11.1116 237.838 10.5355C237.554 9.97857 237.082 9.5506 236.383 9.25926L236.376 9.25674C235.658 8.9454 234.682 8.74193 233.427 8.66512L233.422 8.66484C232.153 8.57417 230.579 8.5284 228.699 8.5284H224.925C222.419 8.5284 220.367 8.61989 218.766 8.80065L218.763 8.80106C217.161 8.96892 215.931 9.25655 215.05 9.64807C214.174 10.0374 213.614 10.5384 213.308 11.128C212.985 11.7514 212.81 12.5572 212.81 13.5678C212.81 14.2023 212.854 14.7571 212.94 15.2352C213.02 15.6822 213.178 16.068 213.409 16.4C213.647 16.7115 213.986 16.9886 214.445 17.2236C214.904 17.4594 215.534 17.6648 216.35 17.8304C217.161 17.9951 218.16 18.1176 219.351 18.1953C220.558 18.2602 221.997 18.2928 223.667 18.2928H228.856C230.938 18.2928 232.732 18.3784 234.236 18.5514C235.735 18.7239 237.013 18.9843 238.062 19.3381C239.119 19.6773 239.989 20.1133 240.65 20.6594C241.297 21.1939 241.804 21.8122 242.162 22.5148C242.518 23.1978 242.742 23.9588 242.839 24.7923C242.947 25.6007 243 26.4718 243 27.405C243 28.35 242.912 29.2461 242.735 30.0921C242.567 30.9441 242.259 31.7304 241.809 32.4475C241.354 33.172 240.741 33.8103 239.979 34.3647C239.209 34.9245 238.245 35.3892 237.099 35.7667C235.948 36.146 234.573 36.4262 232.981 36.6122C231.397 36.8116 229.55 36.9104 227.441 36.9104H222.409C220.511 36.9104 218.844 36.8379 217.409 36.6918C215.976 36.5458 214.729 36.3256 213.674 36.0281L213.669 36.0266C212.616 35.7161 211.725 35.3256 211.008 34.8473L211.002 34.8438C210.291 34.356 209.711 33.7849 209.268 33.1285L209.265 33.1237L209.262 33.1188C208.836 32.4512 208.541 31.7027 208.373 30.8782L208.373 30.8767C208.209 30.0558 208.128 29.16 208.128 28.1912V27.7273H212.83V28.1912C212.83 29.335 212.996 30.1757 213.29 30.7519C213.574 31.3097 214.048 31.7448 214.748 32.049C215.471 32.3495 216.443 32.5524 217.684 32.6421C218.955 32.7198 220.529 32.759 222.409 32.759H227.441C229.63 32.759 231.434 32.6546 232.859 32.4492C234.284 32.2438 235.386 31.9205 236.186 31.4961C236.981 31.0746 237.51 30.5446 237.813 29.9173C238.13 29.2478 238.298 28.4158 238.298 27.405C238.298 26.3761 238.177 25.5478 237.951 24.9056L237.95 24.902L237.949 24.8983C237.753 24.3107 237.356 23.832 236.721 23.4623L236.718 23.4604C236.086 23.0864 235.154 22.8033 233.886 22.6368L233.882 22.6362C232.615 22.4571 230.942 22.3656 228.856 22.3656H223.667C221.351 22.3656 219.355 22.2801 217.684 22.1076C216.03 21.9356 214.625 21.6894 213.478 21.3654L213.473 21.364C212.329 21.0276 211.386 20.6095 210.663 20.099L210.658 20.0955C209.946 19.5784 209.387 18.9811 208.995 18.3L208.993 18.2967L208.992 18.2935C208.622 17.6245 208.382 16.8883 208.27 16.0892L208.27 16.0881C208.162 15.3044 208.108 14.464 208.108 13.5678C208.108 12.6243 208.189 11.7418 208.353 10.9217L208.354 10.9181L208.355 10.9144C208.537 10.0706 208.869 9.30534 209.352 8.62359C209.837 7.92431 210.494 7.31454 211.308 6.78987C212.133 6.25906 213.169 5.83021 214.404 5.49437C215.656 5.1447 217.144 4.88552 218.865 4.71345C220.588 4.54115 222.608 4.45563 224.925 4.45563H228.699C230.596 4.45563 232.263 4.52801 233.697 4.67401C235.131 4.80687 236.379 5.02702 237.436 5.33862C238.488 5.63538 239.378 6.0184 240.096 6.49616C240.825 6.95949 241.411 7.52768 241.843 8.20302Z" fill="#B9B8B6"/>
  <path d="M174.608 35.7388V5.54858H204.798V8.6934H178.382V18.7568H203.54V21.9016H178.382V32.594H204.798V35.7388H174.608Z" fill="#B9B8B6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M174.144 36.2028V5.08459H205.262V9.15737H178.846V18.2928H204.004V22.3656H178.846V32.13H205.262V36.2028H174.144ZM178.382 32.594V21.9016H203.54V18.7568H178.382V8.69339H204.798V5.54858H174.608V35.7388H204.798V32.594H178.382Z" fill="#B9B8B6"/>
  <path d="M123.348 8.06444V35.7388H119.574V5.54858H125.863L143.455 31.965L161.046 5.54858H167.06V35.7388H163.287V8.47719L145.361 35.7388H141.548L123.348 8.06444Z" fill="#B9B8B6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M123.812 36.2028H119.11V5.08459H126.112L143.455 31.1279L160.798 5.08459H167.525V36.2028H162.823V10.0273L145.612 36.2028H141.298L123.812 9.61431V36.2028ZM123.348 8.06443L141.548 35.7388H145.361L163.287 8.47718V35.7388H167.061V5.54858H161.046L143.455 31.965L125.863 5.54858H119.574V35.7388H123.348V8.06443Z" fill="#B9B8B6"/>
  <path d="M69.8857 35.7388H66.1119V30.0781C66.1119 29.1609 66.0923 28.3747 66.0529 27.7195C66.0267 27.0513 65.9154 26.4813 65.7188 26.0095C65.5354 25.5378 65.2405 25.1578 64.8343 24.8695C64.4281 24.5813 63.8516 24.3585 63.1047 24.2013C62.3578 24.044 61.4078 23.9392 60.2547 23.8868C59.1147 23.8213 57.7061 23.7885 56.0288 23.7885H39.0665V35.7388H35.2927V5.54858H56.6578C58.964 5.54858 60.9033 5.63376 62.4757 5.8041C64.0612 5.96134 65.365 6.20375 66.3871 6.53134C67.4223 6.85892 68.215 7.26513 68.7654 7.74996C69.3288 8.23478 69.735 8.80478 69.984 9.45995C70.246 10.1151 70.3967 10.8489 70.436 11.6613C70.4884 12.4737 70.5147 13.3713 70.5147 14.3541C70.5147 15.612 70.4229 16.7192 70.2395 17.6758C70.0691 18.6192 69.7743 19.4251 69.355 20.0934C68.9357 20.7616 68.3788 21.2989 67.6843 21.7051C66.9898 22.0982 66.1185 22.3733 65.0702 22.5306C66.1185 22.6878 66.9571 22.963 67.586 23.3561C68.215 23.7492 68.6998 24.2602 69.0405 24.8892C69.3812 25.5182 69.604 26.2651 69.7088 27.1299C69.8267 27.9947 69.8857 28.9775 69.8857 30.0781V35.7388ZM39.0665 20.6437H56.6578C58.335 20.6437 59.7437 20.6175 60.8837 20.5651C62.0368 20.4996 62.9868 20.3882 63.7336 20.2309C64.4805 20.0737 65.0571 19.8509 65.4633 19.5627C65.8695 19.2744 66.1643 18.8944 66.3478 18.4227C66.5443 17.9509 66.6557 17.3875 66.6819 16.7323C66.7212 16.0641 66.7409 15.2713 66.7409 14.3541C66.7409 13.5023 66.7212 12.7686 66.6819 12.1527C66.6557 11.5368 66.5443 11.0193 66.3478 10.5999C66.1643 10.1806 65.8695 9.8465 65.4633 9.59753C65.0571 9.34857 64.4805 9.15857 63.7336 9.02754C62.9868 8.8834 62.0368 8.79168 60.8837 8.75237C59.7437 8.71305 58.335 8.6934 56.6578 8.6934H39.0665V20.6437Z" fill="#B9B8B6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M70.3498 36.2028H65.648V30.0781C65.648 29.1668 65.6285 28.3904 65.5899 27.7473L65.5896 27.7425L65.5894 27.7377C65.5648 27.1084 65.4606 26.5958 65.2906 26.188L65.2885 26.1829L65.2865 26.1777C65.1354 25.7891 64.8968 25.4828 64.5659 25.2479C64.2317 25.0107 63.7237 24.8057 63.0092 24.6553C62.2959 24.5051 61.3731 24.4021 60.2337 24.3503L60.2282 24.35C59.1001 24.2852 57.701 24.2525 56.029 24.2525H39.5306V36.2028H34.8289V5.08459H56.6579C58.973 5.08459 60.9295 5.16998 62.5237 5.34258C64.1264 5.50162 65.4643 5.7484 66.528 6.08922C67.5961 6.42733 68.4542 6.8581 69.0701 7.40001C69.6864 7.93082 70.1385 8.56199 70.4164 9.2914C70.6989 9.99904 70.8578 10.782 70.8994 11.6352C70.9524 12.4583 70.9788 13.3648 70.9788 14.3541C70.9788 15.6323 70.8857 16.7691 70.6957 17.7608C70.517 18.7492 70.2045 19.6126 69.7481 20.3399C69.2883 21.0729 68.6764 21.6624 67.9187 22.1056L67.9159 22.1072L67.913 22.1088C67.6251 22.2718 67.3124 22.4145 66.9755 22.5379C67.288 22.6601 67.5739 22.8013 67.8321 22.9626C68.5264 23.3966 69.0683 23.966 69.4486 24.6682C69.8219 25.3574 70.0585 26.1615 70.1691 27.0705C70.2902 27.9598 70.3498 28.963 70.3498 30.0781V36.2028ZM66.2167 22.7728C65.8674 22.6736 65.4853 22.5928 65.0703 22.5306C65.4801 22.4691 65.8629 22.3896 66.2187 22.2921C66.7729 22.1402 67.2615 21.9445 67.6844 21.7051C68.3789 21.2989 68.9358 20.7616 69.3551 20.0933C69.7744 19.4251 70.0693 18.6192 70.2396 17.6758C70.423 16.7192 70.5148 15.612 70.5148 14.3541C70.5148 13.3713 70.4886 12.4737 70.4361 11.6613C70.3968 10.8489 70.2462 10.1151 69.9841 9.45994C69.7351 8.80477 69.3289 8.23477 68.7655 7.74995C68.2151 7.26512 67.4224 6.85892 66.3872 6.53133C65.3651 6.20375 64.0613 5.96133 62.4758 5.80409C60.9034 5.63375 58.9641 5.54858 56.6579 5.54858H35.2928V35.7388H39.0666V23.7885H56.029C57.7062 23.7885 59.1148 23.8213 60.2548 23.8868C61.4079 23.9392 62.3579 24.044 63.1048 24.2013C63.8517 24.3585 64.4282 24.5813 64.8345 24.8695C65.2407 25.1578 65.5355 25.5378 65.7189 26.0095C65.9155 26.4813 66.0269 27.0512 66.0531 27.7195C66.0924 28.3747 66.112 29.1609 66.112 30.0781V35.7388H69.8858V30.0781C69.8858 28.9774 69.8268 27.9947 69.7089 27.1299C69.6041 26.265 69.3813 25.5182 69.0406 24.8892C68.7 24.2602 68.2151 23.7492 67.5862 23.3561C67.2062 23.1186 66.7497 22.9242 66.2167 22.7728ZM65.9175 18.2493L65.9196 18.2442C66.09 17.8354 66.1938 17.3288 66.2184 16.7138L66.2186 16.7094L66.2188 16.7051C66.2575 16.0485 66.277 15.2653 66.277 14.3541C66.277 13.5088 66.2575 12.7854 66.219 12.1822L66.2187 12.1773L66.2185 12.1724C66.194 11.5987 66.0912 11.1455 65.9278 10.7969L65.9252 10.7914L65.9228 10.7859C65.779 10.4572 65.5498 10.1947 65.221 9.99312C64.8851 9.7873 64.373 9.61074 63.6536 9.48453L63.6497 9.48385L63.6458 9.4831C62.9315 9.34525 62.0079 9.25493 60.868 9.21607C59.7351 9.177 58.3321 9.15737 56.6579 9.15737H39.5306V20.1797H56.6579C58.3298 20.1797 59.7299 20.1536 60.86 20.1017C61.9991 20.0369 62.923 19.9275 63.6382 19.7769C64.3527 19.6265 64.8607 19.4215 65.1949 19.1843C65.5258 18.9494 65.7643 18.6431 65.9155 18.2545L65.9175 18.2493ZM39.0666 20.6437V8.69339H56.6579C58.3352 8.69339 59.7438 8.71305 60.8838 8.75236C62.0369 8.79167 62.9869 8.88339 63.7338 9.02753C64.4807 9.15856 65.0572 9.34856 65.4634 9.59753C65.8696 9.84649 66.1644 10.1806 66.3479 10.5999C66.5444 11.0192 66.6558 11.5368 66.682 12.1527C66.7213 12.7685 66.741 13.5023 66.741 14.3541C66.741 15.2713 66.7213 16.064 66.682 16.7323C66.6558 17.3875 66.5444 17.9509 66.3479 18.4227C66.1644 18.8944 65.8696 19.2744 65.4634 19.5627C65.0572 19.8509 64.4807 20.0737 63.7338 20.2309C62.9869 20.3882 62.0369 20.4996 60.8838 20.5651C59.7438 20.6175 58.3352 20.6437 56.6579 20.6437H39.0666Z" fill="#B9B8B6"/>
  <path d="M1.32861 35.7388V5.54858H30.2609V8.6934H5.10239V18.7568H29.003V21.9016H5.10239V35.7388H1.32861Z" fill="#B9B8B6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.864746 36.2028V5.08459H30.725V9.15737H5.56649V18.2928H29.4671V22.3656H5.56649V36.2028H0.864746ZM5.10251 21.9016H29.0031V18.7568H5.10251V8.69339H30.261V5.54858H1.32873V35.7388H5.10251V21.9016Z" fill="#B9B8B6"/>
</svg>
`;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    background: "#0B0B0B",
    card: "#040404",
    text: "#F0F0F0",
    border: "transparent",
    notification: "rgb(255, 69, 58)",
    iconDefault: "#F0F0F0",
    iconActive: "#906447",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

function HomeTopTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="Entries"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text1,
        tabBarInactiveTintColor: theme.colors.text2,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: theme.font.font500,
          textTransform: "capitalize",
        },
        tabBarStyle: {
          backgroundColor: "#0B0B0B",
        },
        tabBarItemStyle: {
          width: "auto",
        },
        tabBarContentContainerStyle: {
          justifyContent: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          height: 2,
        },
        tabBarIndicatorContainerStyle: {
          marginHorizontal: 143,
        },
      }}
    >
      <TopTab.Screen name="Entries" component={HomeScreen} options={{ tabBarLabel: "Entries" }} />
      <TopTab.Screen name="Info" component={InfoScreen} options={{ tabBarLabel: "Info" }} />
    </TopTab.Navigator>
  );
}

function ProfileTopTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="Entries"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.text1,
        tabBarInactiveTintColor: theme.colors.text2,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: theme.font.font500,
          textTransform: "capitalize",
        },
        tabBarStyle: {
          // backgroundColor: '#040404',
          backgroundColor: "#0B0B0B",
        },
        tabBarItemStyle: {
          width: "auto",
        },
        tabBarContentContainerStyle: {
          justifyContent: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          height: 2,
        },
        tabBarIndicatorContainerStyle: {
          marginHorizontal: 113,
        },
      }}
    >
      <TopTab.Screen name="My Profile" component={ProfileScreen} options={{ tabBarLabel: "My Profile" }} />
      <TopTab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: "Settings" }} />
    </TopTab.Navigator>
  );
}

function NotificationsButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
      <Ionicons name={"notifications-outline"} size={25} color={"white"} />
    </TouchableOpacity>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log("User logged in - " + user.email);
      } else {
        setIsLoggedIn(false);
        console.log("No user loggged in");
      }
    });
    return unsubscribe;
  }, []);

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
      <SafeAreaView style={styles.wrapper}>
        <ThemeProvider>
          <NavigationContainer theme={MyTheme}>
            {!isLoggedIn ? (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            ) : (
              <>
                <View style={[styles.dflex, styles.justifyContentCenter, styles.logoBar]}>
                  <View>
                    <SvgXml xml={LOGO_SVG} />
                  </View>
                </View>

                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    headerStyle: {
                      backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                      fontFamily: "Montserrat_500Medium",
                    },
                    tabBarStyle: { height: 70, backgroundColor: "#0B0B0B" },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                        size = 28;
                      } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                        size = 28;
                      } else if (route.name === "Add") {
                        iconName = focused ? "add-circle" : "add-circle";
                        size = 35;
                      } else if (route.name === "Notifications") {
                        iconName = focused ? "notifications" : "notifications-outline";
                        size = 28;
                      } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                        size = 28;
                      }

                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: MyTheme.colors.iconActive,
                    tabBarInactiveTintColor: MyTheme.colors.iconDefault,
                  })}
                >
                  <Tab.Screen name="Home" component={HomeTopTabs} options={{ headerShown: false }} />
                  <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                  <Tab.Screen name="Add" component={NewEntryScreen} options={{ headerShown: false }} />
                  <Tab.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
                  <Tab.Screen name="Profile" component={ProfileTopTabs} options={{ headerShown: false }} />
                </Tab.Navigator>
              </>
            )}
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  dflex: {
    display: "flex",
    flexDirection: "row",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    // backgroundColor: '#040404',
    backgroundColor: "#0B0B0B",
  },
  logoBar: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
});
