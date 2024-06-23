/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable semi */

import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth'
import cadena from './images/cadenas.png';
import user from './images/utilisateur.png'

const Signin = (navigation) => {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('')
    const [erreur, setError] = useState('')
    const [isLoding, setLoding] = useState(false)

    function connect() {

        if (id == '' || pass == '') {
            setError('veuiller entrer des valeurs')
            return;
        }
        setLoding(true)
        auth().createUserWithEmailAndPassword(id, pass)
            .then(() => {
                setError("")
                setId('')
                setLoding(false)
                setPass('')
                navigation.navigate('Menu')
            })
            .catch(error => {
                setLoding(false)
                if (error.code === 'auth/email-already-in-use')
                    setError('cette adresse est deja utilisee')
                if (error.code === 'auth/invalid-email')
                    setError("cette email n'est pas valide")
                else
                    setError('une erreur c est produite veuiller reesayer')
            })

    }
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Email</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                <Image source={user} style={{ width: 50, height: 50 }}></Image>
                <TextInput onChangeText={setId} style={styles.input}></TextInput>
            </View>
            <Text style={styles.text}>password</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 30 }}>
                <Image source={cadena} style={{ width: 50, height: 50 }}></Image>
                <TextInput secureTextEntry onChangeText={setPass} style={styles.input}></TextInput>
            </View>
            <Button title="s'inscrire" onPress={connect}></Button>
            <Text style={styles.Error}>{erreur}</Text>
            {isLoding && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2c5fd4" />
                    <Text>Chargement en cours...</Text>
                </View>
            )}

        </View>
    )
}


let styles = StyleSheet.create({
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        padding: 3,
        fontSize: 30,
        backgroundColor: 'darkgray'
    }, loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "cyan",
        alignItems: "center",
    },
    Error: {
        color: "red"
    },
    text: {
        fontSize: 30,
        color: 'darkgray'
    }
});
export default Signin;