/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput, Button } from "react-native-paper";
import { showToast, ToastModule } from "./compenents/toast.js";

import auth from '@react-native-firebase/auth'
import cadena from './images/cadenas.png';
import user from './images/utilisateur.png'
import logo from "./images/29ppi/logo.png";


function Login({ navigation }) {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [isLoding, setLoding] = useState(false)

    const connect = () => {
        if (id == '' || pass == '') {
            // setError('veuiller entrer des valeurs')
            showToast("error", "Notifications", "veuiller entrer des valeurs", "top")
            return;
        }
        setLoding(true)

        auth().signInWithEmailAndPassword(id, pass).
            then(() => {
                setId('')
                setError('')
                setPass('')
                setLoding(false)

                navigation.navigate('Menu')
            })
            .catch(() => {
                setLoding(false)
                // setError('login failed')
                showToast("error", "Notifications", "Erreur Login", "top")
            })

    }

    const Signin = () => {
        navigation.navigate('Sign In')
    }

    const Login = () => {

        return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={login.rectangleView}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={logo} style={{ marginTop: 30 }} />
                    <Text style={{ marginTop: 30, fontFamily: "DIN Black", fontWeight: "bold", fontSize: 20 }}>Connecter vous</Text>
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

                        <Button mode="contained" labelStyle={{ color: "white", fontSize: 18 }} style={[login.btn, { marginTop: 25, marginBottom: 10 }]} onPress={connect}>Connection</Button>
                        <Button labelStyle={{ textDecorationLine: "underline" }} onPress={Signin}>Je n'ai pas de compte</Button>
                        {isLoding && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#2c5fd4" />
                                <Text style={{ color: 'darkgray' }}>Chargement en cours...</Text>
                            </View>)}
                    </View>
                </View>
            </View>

        </View>)
    }

    const kenyCode = () => {


        return (
            <View style={styles.container}>
                <Text style={styles.text}>Connecter vous</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                    <Image source={user} style={{ width: 50, height: 50 }}></Image>
                    <TextInput value={id} onChangeText={setId} style={styles.input} placeholder="Email" placeholderTextColor='darkgray'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 30 }}>
                    <Image source={cadena} style={{ width: 50, height: 50 }}></Image>
                    <TextInput secureTextEntry={true} value={pass} onChangeText={setPass} placeholder="password" placeholderTextColor='darkgray' style={styles.input}></TextInput>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '70%', position: 'relative', left: 25 }}>
                    <Button title="connect" onPress={connect}></Button>
                    <TouchableOpacity onPress={Signin} style={{ marginVertical: 20 }}>
                        <Text style={styles.sign}>je n'ai pas de compte</Text>
                    </TouchableOpacity>

                </View>
                {isLoding && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2c5fd4" />
                        <Text style={{ color: 'darkgray' }}>Chargement en cours...</Text>
                    </View>)}
                <Text style={styles.Error}>{error}</Text>
            </View>
        );
    }

    return (
        <>
            {ToastModule()}

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={login.rectangleView}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image source={logo} style={{ marginTop: 30 }} />
                        <Text style={{ marginTop: 30, fontFamily: "DIN Black", fontWeight: "bold", fontSize: 20 }}>Connecter vous</Text>
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

                            <Button mode="contained" labelStyle={{ color: "white", fontSize: 18 }} style={[login.btn, { marginTop: 25, marginBottom: 10 }]} onPress={connect}>Connection</Button>
                            <Button labelStyle={{ textDecorationLine: "underline" }} onPress={Signin}>Je n'ai pas de compte</Button>
                            {isLoding && (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#2c5fd4" />
                                    <Text style={{ color: 'darkgray' }}>Chargement en cours...</Text>
                                </View>)}
                        </View>
                    </View>
                </View>

            </View>
        </>
    )
}




let styles = StyleSheet.create({
    input: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 7,
        padding: 3,
        fontSize: 20,
        color: 'black'
        // backgroundColor:'darkgray'
    }, loadingContainer: {
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
    }
});

const login = StyleSheet.create(
    {
        rectangleView: {
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: {
                width: 0,
                height: 7
            },
            shadowRadius: 20,
            elevation: -1,
            shadowOpacity: 1,
            borderRadius: 20,
            backgroundColor: "#fff",
            width: "90%",
            height: 570
            , padding: 20
        }, input: {
            marginTop: 20,
            width: "100%"
        }
        , btn:
        {
            borderRadius: 10,
            backgroundColor: "#3a4de5",
        }
    }
)

export default Login;