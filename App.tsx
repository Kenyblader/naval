/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import Login from './src/login'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Game from './src/game';
import Signin from './src/signin';
import Menu from './src/menu';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const Stack=createNativeStackNavigator();


function App(): React.JSX.Element {
  let x=Dimensions.get("window").width;
  let y=Dimensions.get("window").height;

  return (
   <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen   name='Login' component={Login}/> 
      <Stack.Screen name='Partie' component={Game}/>
      <Stack.Screen name='Sign In' component={Signin}/>
      <Stack.Screen name='Menu' component={Menu}/>
    </Stack.Navigator>
   </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
