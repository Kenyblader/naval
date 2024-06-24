import { useEffect, useState } from "react";
import { Button, Dimensions, GestureResponderEvent, Image, ImageBackground, NativeEventEmitter, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ImageList from './imageList';
import gameBackground from './images/beautiful-medieval-fantasy-landscape.jpg'
import { useRoute } from "@react-navigation/native";
import { colorTitle } from "./login";
import { getAdverseConstaintScreen, initAUser, lancerAttaque, lancerPartie, subscribeToFirestoreUpdates, subscribeToPositions } from "../database";
import { transformer } from "../metro.config";


 interface Position{
    x:number
    y:number
 }

 interface roorReceiver {
    isHote:Boolean,receiver:string
 }
const Game=({navigation}:any)=>{
    const [maList,setList]=useState<Position[]>([]);
    const [text,setText]=useState('En Attente ...');
    const [heightSreen,setHeightScreen]= useState('95%')
    const [isFirstTime,setFirstTime]=useState(true)
    const root=useRoute()
    const{isHote,receiver,idPartie}:any=root.params;
    const [isBegining,setBegining]=useState(false)
    const [adverseConstaintScreen,setAdverseConstainScreen]=useState<Position>()

    useEffect(()=>{
        
    if(!isHote){
       const val=subscribeToFirestoreUpdates((data)=>{
            if(data.statut)
                hangleFunction()
        })
    }
        const val=subscribeToPositions((data)=>{
           if(data)
            reciveAttaque(data.position)
        })
    },[])
   

    let a:number=(Dimensions.get('window').width)/5;
    let b:number=(Dimensions.get('window').height)/10;
    const maxPlayer=10;
    function TranslateDimension(p:Position):Position{
        let x2=p.x;
        let y2=p.y;
        
        
         x2=(x2<0)?0:x2;
         x2=(x2>5*a)?4*a:x2;
 
         y2=(y2<0)?0:y2;
         y2=(y2>10*b)?9*b:y2;
        
         let pre:number=0;
         
         for(let i=1;i<=5;i++){
             let val=a*i;
             if(val>x2){
                 x2=pre;
                 break;
             }
            
             pre=val;
         }
         pre=0;
         for(let i=1;i<=10;i++){
             let val=i*b;
             if(y2<val){
                 y2=pre
                 break
             }
             pre=val;
         }
        
         
        return {x:(x2),y:(y2)};
     }

     function correctDimention(p:Position){
        let x=p.x;
        let y=p.y;
        x=x*a/adverseConstaintScreen?.x;
        y=y*b/adverseConstaintScreen?.y;

     }

     function reciveAttaque(p:Position){
        let p2=TranslateDimension(p)
        p=TranslateDimension(p);
        let i=maList.length;
        let found:boolean=false;
        maList.forEach(element => {
            if(element.x==p.x && element.y==p.y){
                found=true;
            }
        });
        if(found)
            {
                let newList=maList.filter(item=>(item.x!==p.x || item.y!==p.y));
                setList(newList);
                i--;
            }
     }

     function setAttack(p:Position){
        lancerAttaque(p,receiver)
     }


     function hangleFunction(){
        setHeightScreen('100%');
        setBegining(true)
        initAUser(a,b)
        if(isHote){
             lancerPartie(idPartie)
        }   
     }

  
    function  onTouch(even:GestureResponderEvent){
            
        let i=maList.length;
        let p:Position={x:even.nativeEvent.locationX,y:even.nativeEvent.locationY};
        p=TranslateDimension(p);
        if(isBegining){
            if(isFirstTime)
            {
                    setAdverseConstainScreen(getAdverseConstaintScreen(receiver))
                    setFirstTime(false)
            }
            setAttack(p)
            return;
        }else{
        let found:boolean=false;
        maList.forEach(element => {
            if(element.x==p.x && element.y==p.y){
                found=true;
            }
        });
        
        if(!found && maList.length<maxPlayer){
           setList([...maList,p])
           i++;
        }
        else if(found)
        {
            let newList=maList.filter(item=>(item.x!==p.x || item.y!==p.y));
            setList(newList);
            i--;
        }
    }
       
    }

    return(<View style={{height:heightSreen}}>
        <TouchableWithoutFeedback onLongPress={onTouch}>
        <View style={styles.container} >
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.flatList}>
        <ImageBackground source={gameBackground} style={styles.background}>
            {ImageList(maList)}
        </ImageBackground>
        </View>
        <View style={styles.bottomBar}>
            <Pressable style={{backgroundColor:'#63b0da',height:'100%',alignItems:'center'}} onPress={hangleFunction}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{text}</Text>
            </Pressable>
        </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex:1,
        width:'100%',
        height:'100%',
        borderWidth:2,
        borderRadius:10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    background:{
        flex:1,
        resizeMode:'cover'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
       
      },
      flatList: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        width:'100%',
        height:'100%',
    
      },
      button:{
        padding:5,
        borderRadius:5,
        backgroundColor:'ligthgreen',
        height:'100%'
      },
      text:{
        color:'black',
        fontWeight:'bold'
      },
      bottomBar:{
        position:'absolute',
        top:'100%',
        width:'100%',
        height:'100%',
        backgroundColor:'red',
        flex:1
      }
})
export default Game;
export type {Position};