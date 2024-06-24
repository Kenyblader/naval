import { FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import jeux from './images/jeux.png'
import avatar from './images/avatar.png'
import React, { useState } from "react"
import { colorTitle } from "./login"
import auth from "@react-native-firebase/auth"
import { userSalon,otherSalon } from "./menuContain"
import { NavigationProp, ParamListBase } from "@react-navigation/native"


const Menu=(navigation)=>{
    const [part,setPart]=useState(false)
    
    
    return(
        <View style={{flex:1,backgroundColor:colorTitle}}>
        <View style={{flexDirection:'column',padding:'5%', alignItems:'center',width:'100%',height:'25%'}}>
           <Image source={avatar} style={styles.avatar} />
           <Text style={{color:'white',fontSize:20, fontWeight:'500'}}>Bienvenue Que Voulez Vous Faire? </Text>
           <View style={{flexDirection:'row',borderWidth:2,borderRadius:20,alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{setPart(false)}}>
                <Text style={[styles.text,{borderRightWidth:2}]}>heberger</Text>
            </TouchableOpacity>
               
            <TouchableOpacity onPress={()=>{setPart(true)}}>
                <Text style={styles.text}>se connecter</Text>
            </TouchableOpacity></View>
        </View>
        <View style={{flex:1,flexDirection:'column', alignItems:'center',backgroundColor:'white', borderTopStartRadius:30,borderTopEndRadius:30, borderWidth:1 ,}}>
                {!part && userSalon(navigation)}
                {part && otherSalon(navigation)}
        </View>
        </View>
    )
}

const styles =StyleSheet.create({
    image:{
        width:'40%',
        height:'70%',
        marginBottom:'5%'
    },
    text:{
        fontSize:18,
        color:'black',
        padding:10
    },
    avatar:{
        width:70,
        height:70,
        marginBottom:'5%'
    }
})

export default Menu;


