import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native"
import { createPartie, ecouteEventPartie, ecouteEventParties, joueur, rejoindrePartie } from "../database"
import { colorTitle } from "./login"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationAction, NavigationProp, NavigatorScreenParams, ParamListBase, useNavigation } from "@react-navigation/native"

const player:joueur[]=[
    {name:"joueur1",mail:''},
    {name:"joueur2",mail:''},
    {name:"joueur3",mail:''},
]

export const userSalon=({navigation})=>{
    const [istcreate,setCreate]=useState(false)
    const [idPartie,setIdPartie]=useState('')
    
    function InitialisePArtie(){
        createPartie()
        setCreate(true)
    }


    if(istcreate)
        return(<SafeAreaView style={{flex:1}}>
            <FlatList data={player} style={{flex:2}} renderItem={item=>
                <View style={styles.playerContainer}>
                    <Text style={styles.text}>{item.item.name}</Text>
                </View>
            } />
        </SafeAreaView>)
    else
    return(<View style={{flex:1}}>
        <TouchableNativeFeedback onPress={InitialisePArtie}>
            <View style={styles.container}>
                <Text style={styles.text}>creer une partie</Text>
            </View>
        </TouchableNativeFeedback>
    </View>)
}



export const otherSalon= ({navigation})=>{
    const [listParties,setParties]=useState([''])
    const [isLoding,setLoding]=useState(false)
    
   useEffect(()=>{
    setLoding(true)
    ecouteEventParties()
        .then(names=>{setLoding(false);setParties(names)})
        .catch(error=>{setLoding(false);console.log(error)})  
   },[])

    function  connecter(id:string){
        console.log("ok")
        rejoindrePartie(id)
        .then(()=>{navigation.navigate('Partie')})
        .catch((error)=>{console.log(error)})
    }

    if(isLoding)
        return <ActivityIndicator size='large' color={colorTitle}></ActivityIndicator>;
    else
    return(
        <SafeAreaView style={{flex:1}}>
            <FlatList data={listParties} style={{flex:2}} renderItem={item=>
            <TouchableNativeFeedback onPress={()=>{connecter(item.item)}}>
                <View style={styles.playerContainer}>
                    <Text style={styles.text}>{item.item}</Text>
                </View>
            </TouchableNativeFeedback>
            } />
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        borderWidth:1,
        backgroundColor:'rgb(231, 232, 238)',
        alignItems:'center',
        borderRadius:20,
        padding:10,
        marginVertical:'50%'
    },
    text:{
        fontSize:18,
        fontWeight:'700',
        color:'black',  
    },
    playerContainer:{
        paddingHorizontal:'35%',
        paddingVertical:30,
        backgroundColor:colorTitle,
        borderRadius:15,
        marginVertical:20,
        width:'100%',
        alignItems:'center'
    }
})


