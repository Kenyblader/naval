import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native"
import { createPartie, ecouteEventPartie, ecouteEventParties, joueur, rejoindrePartie } from "../database"
import { colorTitle } from "./login"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationAction, NavigationProp, NavigatorScreenParams, ParamListBase, useNavigation } from "@react-navigation/native"
import ready from './images/checked.png'
import configure from './images/setting.png'


export const userSalon=({navigation})=>{
    const [istcreate,setCreate]=useState(false)
    const [player,setPlayer]=useState([])
    const [isLoding,setLoding]=useState(false)
    let id=0;

    useEffect(()=>{
        setLoding(true)
        console.log('debut use')
        ecouteEventPartie()
            .then(names=>{setLoding(false);setPlayer(names.joueurs);console.log(names);id=names.hote})
            .catch(error=>{setLoding(false);console.log(error)}) 
        console.log('useEffect') 
       },[] )

    if(isLoding)
        return <ActivityIndicator size='large' color={colorTitle}></ActivityIndicator>;
    else
       return(<><View style={{flex:1}}>
        <FlatList data={player} style={{flex:2}} renderItem={item=>
            <View style={styles.playerContainer}>
                <Text style={styles.text}>{item.item.name}</Text>
            </View>
        } />
       
    </View>
    <View style={{ width:'100%', flexDirection:'row',  alignItems:'center',paddingHorizontal:'45%'}}>
            <Pressable onPress={()=>{navigation.navigate('Partie',{isHote:true,receiver:player[0].name,idPartie:id})}}>
                <Image source={ready}  style={styles.image}></Image>
            </Pressable>
        </View>
    </>)


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
        .then(()=>{navigation.navigate('Partie',{isHote:false,receiver:id,idPartie:id})})
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
    image:{
        width:50,
        marginHorizontal:10,
        height:50
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


