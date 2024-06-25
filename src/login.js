// App.js

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput, Button } from "react-native-paper";
import { showToast, ToastModule } from "./compenents/toast";
import auth from '@react-native-firebase/auth';
import cadena from './images/cadenas.png';
import user from './images/utilisateur.png';
import logo from "./images/29ppi/logo.png";

function Login({ navigation }) {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [whichPage, setWhichPage] = useState(false);

    const connect = () => {
        if (id === '' || pass === '') {
            setError("Veuillez entrer des valeurs");
            // showToast("error", "Connection", "Veuillez entrer des valeurs", "top");
            return;
        }
        setLoading(true);
        auth().signInWithEmailAndPassword(id, pass)
            .then(() => {
                setId('');
                setError('');
                setPass('');
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("Erreur de connexion")
                // showToast("error", "Connection", "Erreur de connexion", "top");
            });
    };

    const CreateAccount = () => {
        if (id == '' || pass == '') {
            setError("Veuillez entrer des valeurs");

            // showToast("error", "Inscription", 'veuiller entrer des valeurs', "top");

            return;
        }
        setLoading(true)
        auth().createUserWithEmailAndPassword(id, pass)
            .then(() => {
                setError("")
                setId('')
                setLoading(false)
                setPass('')
            })
            .catch(error => {
                setLoading(false)
                if (error.code === 'auth/email-already-in-use')
                    setError("Cette adresse est deja utilisee");

                // showToast("error", "Connection", 'cette adresse est deja utilisee', "top");

                if (error.code === 'auth/invalid-email')
                    setError("Cette email n'est pas valide")
                // showToast("error", "Connection", 'cette email n\'est pas valide', "top");

                else
                    setError("une erreur c'est produite veuiller reesayer")

                // showToast("error", "Inscription","une erreur c'est produite veuiller reesayer", "top");

            })
    };



    return (
        <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.shadowContainer}>
                    <ToastModule />
                    <View style={login.rectangleView}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={logo} style={{ marginTop: 30 }} />
                            {!whichPage && (<Text style={{ marginTop: 30, fontFamily: "DIN Black", fontWeight: "bold", fontSize: 20 }}>Connectez-vous</Text>)}
                            {whichPage && (<Text style={{ marginTop: 30, fontFamily: "DIN Black", fontWeight: "bold", fontSize: 20 }}>S'inscrire</Text>)}
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "80%" }}>
                                <TextInput
                                    label="Email"
                                    value={id}
                                    onChangeText={text_val => setId(text_val)}
                                    style={login.input}
                                    mode="outlined"
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    label="Mot de passe"
                                    value={pass}
                                    onChangeText={password_val => setPass(password_val)}
                                    style={login.input}
                                    mode="outlined"
                                    secureTextEntry
                                />
                                {!whichPage && (<Button mode="contained" labelStyle={{ color: "white", fontSize: 18 ,fontWeight:"bold" }} style={[login.btn, { marginTop: 25, marginBottom: 10 }]} onPress={() => connect()}>Connexion</Button>
                                )
                                }
                                {
                                    whichPage && (<Button mode="contained" labelStyle={{ color: "white", fontSize: 18 ,fontWeight:"bold"}} style={[login.btn, { marginTop: 25, marginBottom: 10 }]} onPress={() => CreateAccount()}>S'inscrire</Button>
                                    )
                                }
                                {!whichPage && (<Button labelStyle={{ textDecorationLine: "underline" }} onPress={() => { setWhichPage(!whichPage); setError("") }}>Je n'ai pas de compte</Button>
                                )}
                                {whichPage && (<Button labelStyle={{ textDecorationLine: "underline" }} onPress={() => { setWhichPage(!whichPage); setError("") }}>J'ai deja un compte</Button>
                                )}
                                <Text style={styles.Error}>{error}</Text>

                                {isLoading && (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color="#3A4DE5" />
                                        <Text style={{ color: 'darkgray' }}>Chargement en cours...</Text>
                                    </View>)}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        padding: 3,
        fontSize: 20,
        color: 'black'
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    Error: {
        color: "red"
    },
    text: {
        fontSize: 30,
        color: 'black',
        marginBottom: '20%',
        marginTop: '5%'
    },
    sign: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '20%',
        fontSize: 17
    },
    shadowContainer: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        elevation: 10,
        width: "90%",
        borderRadius: 20
    }
});

const login = StyleSheet.create({
    rectangleView: {
        borderRadius: 20,
        backgroundColor: "#fff",
        elevation: -1,
        width: "100%",
        height: 570,
        padding: 20
    },
    input: {
        marginTop: 20,
        width: "100%"
    },
    btn: {
        backgroundColor: "#3A4DE5",
    }
});

export default Login;
