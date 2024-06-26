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
import Menue from "./src/Menue.tsx";
import Game from './src/game';
import Menu from './src/menu';
import Game_Online from './src/game_online.tsx';
import ChoiceScreen from './src/choiceScreen';

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
        <Stack.Screen name="Game_Online" component={Game_Online} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name='Choice' component={ChoiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
