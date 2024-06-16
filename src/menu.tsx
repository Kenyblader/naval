import { FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native"
import jeux from './images/jeux.png'
import React, { useState } from "react"


const Menu=()=>{
    const [malist,setList]=useState<string[]>(['blader','keny'])
    function createPArtie(){

    }

    function connecter(){

    }
    
    return(
        <View style={{flex:1,flexDirection:'column', alignItems:'center'}}>
            <TouchableNativeFeedback >
            <View style={styles.container}>
                <Image source={jeux} style={styles.image} />
                <Text style={styles.text}>heberger une partie</Text>
            </View>
            </TouchableNativeFeedback >
            <TouchableWithoutFeedback>
            <View style={styles.container}>
               <FlatList data={malist} style={{width:'90%'}} renderItem={(item)=>(<View style={{borderBottomWidth:1,backgroundColor:'#333436',marginVertical:5,alignItems:'center'}}>
                    <Text style={{fontSize:20}}>{item.item}</Text>
               </View>)} />
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        width:'70%',
        height:'32%',
        borderWidth:1,
        backgroundColor:'rgb(231, 232, 238)',
        alignItems:'center',
        marginVertical:'10%',
        borderRadius:15,
        paddingVertical:'10%'
    },
    image:{
        width:'40%',
        height:'70%',
        marginBottom:'5%'
    },
    text:{
        fontSize:18,
        color:'black',
       
    }
})

export default Menu;