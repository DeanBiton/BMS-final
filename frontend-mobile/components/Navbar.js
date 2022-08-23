import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import Home from './HomeScreen';
import Events from './EventsScreen';
import Profile from './ProfileScreen';
import SignInScreen from './SignInScreen';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const ScreensStack = createNativeStackNavigator();
/*
function Navbar() {
    const styles = StyleSheet.create({
        container: {
          marginTop: 25,
          padding: 10
        },
        nav: {
          flexDirection: "row",
          justifyContent: "space-around"
        },
        navItem: {
          flex: 1,
          alignItems: "center",
          padding: 10
        }
      });

    return (
        <NativeRouter>
            <View style={styles.container}>
                <View style={styles.nav}>
                    <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
                    <Text>Home</Text>
                    </Link>

                    <Link to="/Events" underlayColor="#f0f4f7" style={styles.navItem}>
                    <Text>Events</Text>
                    </Link>

                    <Link to="/Profile" underlayColor="#f0f4f7"style={styles.navItem}>
                    <Text>Profile</Text>
                    </Link>
                </View>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Events" element={<Events />} />
                    <Route path="/Profile" element={<Profile />} />
                </Routes>
            </View>
        </NativeRouter>
    );
}

export default Navbar;
*/
/*import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './HomeScreen';
import Events from './EventsScreen';

const Stack = createStackNavigator();
function Navbar() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Events" component={Events}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navbar;
*/

function Navbar() {
  return(
    <NavigationContainer>
    <ScreensStack.Navigator screenOptions={{headerShown: false}}>
      <ScreensStack.Group>
      <ScreensStack.Screen
          name={'SignIn'}
          component={SignInScreen}
      />
      <ScreensStack.Screen 
        name={'Home'} 
        component={Home} 
      />
      <ScreensStack.Screen
          name={'Events'}
          component={Events}
      />
      </ScreensStack.Group>
    </ScreensStack.Navigator>
  </NavigationContainer>
  )
}

export default Navbar;
