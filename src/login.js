import React, { useState } from "react";
import { Text, TextInput, View ,Button, StyleSheet, Image, ActivityIndicator, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'
import cadena from './images/cadenas.png';
import user from './images/utilisateur.png'


function Login({navigation}){
    const [id,setId]=useState('');
    const [pass,setPass]=useState('')
    const [error,setError]=useState('')
    const [isLoding,setLoding]=useState(false)
   
    const connect=()=>{
        if(id=='' || pass==''){
            setError('veuiller entrer des valeurs')
            return;
        }
        setLoding(true)
        
       auth().signInWithEmailAndPassword(id,pass).
       then(()=>{
        setId('')
        setError('')
        setPass('')
        setLoding(false)
       
        navigation.navigate('Menu')
       })
       .catch(()=>{
        setLoding(false)
            setError('login failed')
       })
       
    }

    const Signin=()=>{
        navigation.navigate('Sign In')
    }



    return(
        <View style={styles.container}>
            
            <Text style={styles.text}>Connecter vous</Text>
            <View style={{flexDirection:'row',  alignItems:'center',justifyContent:'center',width:'100%',marginBottom:30}}>
                <Image source={user} style={{width:50,height:50}}></Image>
                <TextInput value={id} onChangeText={setId}  style={styles.input} placeholder="Email" placeholderTextColor='darkgray'></TextInput>
            </View> 
            <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',marginBottom:30}}>
                <Image source={cadena} style={{width:50,height:50}}></Image>
                <TextInput secureTextEntry={true} value={pass} onChangeText={setPass} placeholder="password"  placeholderTextColor='darkgray' style={styles.input}></TextInput>
            </View> 
           <View style={{flexDirection:'column',justifyContent:'space-between', width:'70%',position:'relative',left:25}}>
                <Button title="connect" onPress={connect}></Button>
                <TouchableOpacity onPress={Signin} style={{marginVertical:20}}>
                <Text style={styles.sign}>je n'ai pas de compte</Text>
                </TouchableOpacity>
                
            </View>
            {isLoding &&(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2c5fd4" />
                <Text style={{color:'darkgray'}}>Chargement en cours...</Text>
              </View>)}
              <Text  style={styles.Error}>{error}</Text>
        </View>
    );
}




let styles=StyleSheet.create({
    input:{
        width:'70%',
        height:50,
        borderWidth:1,
        borderRadius:7,
        padding:3,
        fontSize:20,
        color:'black'
       // backgroundColor:'darkgray'
    }, loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
    },
    Error:{
        color:"red"
    },
    text:{
        fontSize:30,
        color:'black',
        marginBottom:'20%',
        marginTop:'5%'
    },
    sign:{
        textDecorationLine:'underline',
        fontWeight:'bold',
        color:'black',
        marginLeft:'20%',
        fontSize:17
    }
});

export default Login;