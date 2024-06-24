import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View,ActivityIndicator,TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth'
import cadena from './images/cadenas.png';
import user from './images/utilisateur.png'
import defaultExport from "@react-native-firebase/auth";
import { colorTitle } from "./login";

const Signin=(navigation)=>{
    const [id,setId]=useState('');
    const [pass,setPass]=useState('')
    const [erreur,setError]=useState('')
    const [isLoding,setLoding]=useState(false)

    function connect(){

        if(id=='' || pass==''){
            setError('veuiller entrer des valeurs')
            return;
        }
        setLoding(true)
        auth().createUserWithEmailAndPassword(id,pass)
        .then(()=>{
            setError("")
            setId('')
            setLoding(false)
            setPass('')
            navigation.navigate('Menu')
        })
        .catch(error=>{
            setLoding(false)
            if(error.code==='auth/email-already-in-use')
                setError('cette adresse est deja utilisee')
            if(error.code==='auth/invalid-email')
                setError("cette email n'est pas valide")
            else
                setError('une erreur c est produite veuiller reesayer')
        })
       
    }
    return(
        <View style={styles.container}>
            
        <Text style={styles.text}>Inscriver vous</Text>
        <View style={styles.contaireInput}>
            <Image source={user} style={{width:50,height:50}}></Image>
            <TextInput value={id} onChangeText={setId}  style={styles.input} placeholder="Email" placeholderTextColor='darkgray'></TextInput>
        </View> 
        <View style={styles.contaireInput}>
            <Image source={cadena} style={{width:50,height:50}}></Image>
            <TextInput secureTextEntry={true} value={pass} onChangeText={setPass} placeholder="password"  placeholderTextColor='darkgray' style={styles.input}></TextInput>
        </View> 
       <View style={{flexDirection:'column',justifyContent:'space-between', width:'70%'}}>
            <Button title="s'inscrire" onPress={connect}></Button>
            
        </View>
        {isLoding &&(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2c5fd4" />
            <Text style={{color:'darkgray'}}>Chargement en cours...</Text>
          </View>)}
          <Text  style={styles.Error}>{erreur}</Text>
    </View>
    )
}


let styles=StyleSheet.create({
    contaireInput:{
        flexDirection:'row',
       
        width:'80%',
        marginBottom:30,
        borderWidth:1.5,
        padding:3,
        borderRadius:7,
    },
    input:{
        width:'70%',
        height:50,
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
        color:colorTitle,
        marginBottom:'20%',
        marginTop:'5%',
        fontWeight:'700'
    },
    sign:{
        textDecorationLine:'underline',
        fontWeight:'bold',
        color:'black',
        marginLeft:'20%',
        fontSize:17
    }
});
export default Signin;