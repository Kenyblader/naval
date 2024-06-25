/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import React from 'react';
import type { PropsWithChildren } from 'react';
import Login from './src/login.js';
import Menue from "./src/Menue";
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
const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {

  function VerifAuthentification(): Boolean {

    const [verdict, setVerd] = React.useState(true);
    React.useEffect(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          console.log('User email: ', user.email);
          setVerd(false);
          // L'utilisateur est connecté, vous pouvez ici charger des données spécifiques à l'utilisateur
        } else {
          console.log('No user is signed in.');
          // L'utilisateur n'est pas connecté, vous pouvez rediriger vers la page de connexion
          setVerd(true);
        }
      });

      // Retournez une fonction de nettoyage pour annuler l'abonnement lorsque le composant est démonté
      return unsubscribe;
    }, []);

    // Le reste de votre composant

    return verdict;

  }
  var isa: Boolean = VerifAuthentification();

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={isa ? Login : Menue} />
        <Stack.Screen name="Partie" component={Game} />
        <Stack.Screen name="Sign In" component={Signin} />
        <Stack.Screen name="Menu" component={Menu} />
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
