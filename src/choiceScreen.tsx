import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { createPartie } from "../database"

const ChoiceScreen=({navigation}:any)=>{

    function heberger(){
        navigation.navigate('Menu',{part:false})
    }

    function connecter(){

    }
    return(
        <View style={{flex:1,paddingHorizontal:'10%'}}>
             <TouchableOpacity onPress={()=>{ createPartie();  navigation.navigate('Menu',{part:false})}}>
       
            <View style={styles.container}>
                <Text style={styles.text}>creer une partie</Text>
            </View>
        

            </TouchableOpacity>
               
            <TouchableOpacity onPress={()=>{navigation.navigate('Menu',{part:true})}}>
                <Text style={styles.text}>se connecter</Text>
            </TouchableOpacity>
        </View>
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
})
export default ChoiceScreen