import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, GestureResponderEvent, Image, ImageBackground, NativeEventEmitter, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ImageList from './imageList';
import gameBackground from './images/beautiful-medieval-fantasy-landscape.jpg'
import { useRoute } from "@react-navigation/native";
import { colorTitle } from "./login";
import { getAdverseConstaintScreen, initAUser, lancerAttaque, lancerPartie, setScrore, subscribeToFirestoreUpdates, subscribeToPositions } from "../database";
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
    const [isFirstTime,setFirstTime]=useState(false)
    const root=useRoute()
    const{isHote,receiver,idPartie}:any=root.params;
    const [isBegining,setBegining]=useState(false)
    const [isMyTurn,setMyTurn]=useState(false)
    const [userScore,setUserScore]=useState(5)
    const [otherScore,setOtherScore]=useState(0)
    const [positionReceive,setPositionReceiver]=useState<Position>({x:-1,y:-1})
    

    useEffect(()=>{
        const val=subscribeToFirestoreUpdates((data)=>{

           if(!isHote){ 
            if(data.statut)
                hangleFunction()}
        })
    },[])



    useEffect(()=>{
        const val=subscribeToPositions((data)=>{
            if(data){
                if(isBegining){
                    console.log('vous avez ete attaquer'+data.position.x+" "+data.position.y)
                    if(!(positionReceive.x==data.position.x && positionReceive.y==data.position.y))
                    {setPositionReceiver(data.position)
                    console.log(positionReceive)}
                    if(data.score!=otherScore)
                    {
                        setOtherScore(data.score)
                    }
                }
            }
        })
    
    },[])

    useEffect(()=>{
        if(isBegining){
            setScrore(userScore)
        }
    },[maList])
    
 useEffect(()=>{
    setFirstTime(true)
    console.log('debutReception'+maList.length)
    let p=positionReceive
    reciveAttaque(p).then(()=>{ console.log('ok')}).catch((e)=>{console.log('erreur receier'+e)})
    console.log('finReception'+maList.length)
    setFirstTime(false)
},[positionReceive])

    let a:number=(Dimensions.get('window').width)/5;
    let b:number=(Dimensions.get('window').height)/10;
    const maxPlayer=10;
    function giveNumber(p:Position):Position{
        let x2=p.x;
        let y2=p.y;
        
        
         x2=(x2<0)?0:x2;
         x2=(x2>5*a)?4*a:x2;
 
         y2=(y2<0)?0:y2;
         y2=(y2>10*b)?9*b:y2;
        
        
         
         for(let i=1;i<=5;i++){
             let val=a*i;
             if(val>x2){
                 x2=i-1;
                 break;
             } 
         }
         for(let i=1;i<=10;i++){
             let val=i*b;
             if(y2<val){
                 y2=i-1
                 break
             }
             
         }
         return{x:x2,y:y2}
    }
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
     const reciveAttaque=async (p:Position)=>{
        p= correctDimention(p);
        console.log('positions '+p.x+' '+p.y)
        let newList:Position[]=[]
        console.log(maList.length)
        maList.forEach(element=>{
            if((element.x==p.x && element.y==p.y)){
               console.log('attaqué')
            }
            else{
                newList.push(element)
                console.log('x:'+element.x+" y:"+element.y)  
            }
        })
        setList(newList)
        console.log('attaque px:'+p.x+ 'py:'+p.y)
          
     }


      function correctDimention(p:Position):Position{
      
        console.log(' transformationPosition'+p.x+' '+p.y)
        return{x:p.x*a,y:p.y*b}
     }

    

     function setAttack(p:Position){
        console.error("l'attaque v'as se lancer"+p)
        lancerAttaque(p,receiver)
     }


    const hangleFunction=()=>{
        //setHeightScreen('100%');
        setBegining(true)
        if(isHote){
             lancerPartie(idPartie)
             console.error('lapartie a ete lance')
        } 
        setText('la Partie est lancee')  
        console.log(maList)
     }

  
    const  onTouch=(even:GestureResponderEvent)=>{
        if(isFirstTime)
            return;
            
        let i=maList.length;
        let p:Position={x:even.nativeEvent.locationX,y:even.nativeEvent.locationY};
        if(isBegining){

            setAttack(giveNumber(p))
            return;
        }else{
        p=TranslateDimension(p);
        let found:boolean=false;
        maList.forEach(element => {
            if(element.x==p.x && element.y==p.y){
                found=true;
            }
        });
        
        if(!found && maList.length<maxPlayer){
           setList([...maList,p])
           console.log(p)
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
        {isFirstTime && <ActivityIndicator size='large' color={colorTitle}></ActivityIndicator>}
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
,
      activitieIndicator:{
        position:'absolute',
        top:'40%',
        left:'40%',
        width:'20%',
        zIndex:5
      }
})

export default Game;
export type {Position};