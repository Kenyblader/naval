import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, GestureResponderEvent, Image, ImageBackground, NativeEventEmitter, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ImageList from './imageList';
import gameBackground from './images/beautiful-medieval-fantasy-landscape.jpg'
import { useRoute } from "@react-navigation/native";
import { colorTitle } from "./login";
import { getAdverseConstaintScreen, initAUser, lancerAttaque, lancerPartie, setScrore, subscribeToFirestoreUpdates, subscribeToPositions } from "../database";
import AnimateElement from "./compenents/croix_fleche";


import Croix from "./images/croix.png";
import right from "./images/Fleche.png";

interface Position {
    x: number
    y: number
}

interface roorReceiver {
    isHote: Boolean, receiver: string
}
const Game = ({ navigation }: any) => {
    const [maList, setList] = useState<Position[]>([]);
    const [text, setText] = useState('En Attente ...');
    const [heightSreen, setHeightScreen] = useState('95%')
    const [isFirstTime, setFirstTime] = useState(false)
    const root = useRoute()
    const { isHote, receiver, idPartie }: any = root.params;
    const [isBegining, setBegining] = useState(false)
    const [isMyTurn, setMyTurn] = useState(false)
    const [userScore, setUserScore] = useState(5)
    const [otherScore, setOtherScore] = useState(0)
    const [positionReceive, setPositionReceiver] = useState<Position>({ x: -1, y: -1 })
    const [responsePosition, setResponsePosition] = useState({ top: -1, left: -1 });
    const [viewCroix, setViewCroix] = useState(false);
    const [viewRight, setViewRight] = useState(false);
    const [viewCroixAdversaire, setViewCroixAdversaire] = useState(false);
    const [viewRightAdversaire, setViewRightAdversaire] = useState(false);
    const [turn, setTurn] = useState(isHote);
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        initAUser(a, b)
        const val = subscribeToPositions((data) => {
            console.log('je recois l attaque' + isBegining)
            if (data) {

                console.log('vous avez ete attaquer' + data.position.x + " " + data.position.y)
                setPositionReceiver(data.position)
                setOtherScore(data.score)
                if (data.score == 0 && data.positions.length >= 2) {
                    setHeightScreen('2%')
                }

            } else {
                console.log('data est null')
            }
        })

    }, [])

    useEffect(() => {
        setScrore(userScore)
    }, [maList])



    useEffect(() => {
        setFirstTime(true)
        console.log('debutReception' + maList.length)
        let p = positionReceive
        reciveAttaque(p).then(() => { console.log('ok') }).catch((e) => { console.log('erreur receier' + e) })
        console.log('finReception' + maList.length)
        setFirstTime(false)
    }, [positionReceive])

    let a: number = (Dimensions.get('window').width) / 5;
    let b: number = (Dimensions.get('window').height) / 10;
    const maxPlayer = 8;
    function giveNumber(p: Position): Position {
        let x2 = p.x;
        let y2 = p.y;


        x2 = (x2 < 0) ? 0 : x2;
        x2 = (x2 > 5 * a) ? 4 * a : x2;

        y2 = (y2 < 0) ? 0 : y2;
        y2 = (y2 > 10 * b) ? 9 * b : y2;



        for (let i = 1; i <= 5; i++) {
            let val = a * i;
            if (val > x2) {
                x2 = i - 1;
                break;
            }
        }
        for (let i = 1; i <= 10; i++) {
            let val = i * b;
            if (y2 < val) {
                y2 = i - 1
                break
            }

        }
        return { x: x2, y: y2 }
    }
    function TranslateDimension(p: Position): Position {
        let x2 = p.x;
        let y2 = p.y;


        x2 = (x2 < 0) ? 0 : x2;
        x2 = (x2 > 5 * a) ? 4 * a : x2;

        y2 = (y2 < 0) ? 0 : y2;
        y2 = (y2 > 10 * b) ? 9 * b : y2;

        let pre: number = 0;

        for (let i = 1; i <= 5; i++) {
            let val = a * i;
            if (val > x2) {
                x2 = pre;
                break;
            }

            pre = val;
        }
        pre = 0;
        for (let i = 1; i <= 10; i++) {
            let val = i * b;
            if (y2 < val) {
                y2 = pre
                break
            }
            pre = val;
        }
        return { x: (x2), y: (y2) };
    }
    const reciveAttaque = async (p: Position) => {
        p = correctDimention(p);
        console.log('positions ' + p.x + ' ' + p.y)
        let newList: Position[] = []
        console.log(maList.length)
        maList.forEach(element => {
            if ((element.x == p.x && element.y == p.y)) {
                console.log('attaqué')
            }
            else {
                newList.push(element)
                console.log('x:' + element.x + " y:" + element.y)
            }
        })
        setList(newList)
        console.log('attaque px:' + p.x + 'py:' + p.y)

    }


    function correctDimention(p: Position): Position {

        console.log(' transformationPosition' + p.x + ' ' + p.y)
        return { x: p.x * a, y: p.y * b }
    }



    function setAttack(p: Position) {
        console.error("l'attaque v'as se lancer" + p)
        lancerAttaque(p, receiver)
    }


    function hangleFunction() {
        setBegining(true)
        console.log('idPartie:' + idPartie)
        if (isHote) {
            let ok = lancerPartie(receiver);
            console.error('lapartie a ete lance' + ok)
        }
        setText('la Partie est lancee')
    }

   


    const onTouch = (even: GestureResponderEvent) => {
        if (isFirstTime)
            return;

        let i = maList.length;
        let p: Position = { x: even.nativeEvent.locationX, y: even.nativeEvent.locationY };
        if (isBegining) {

            setAttack(giveNumber(p))
            // setResponsePosition({ top: p.y, left: p.x });
            // setViewCroixAdversaire(!viewCroixAdversaire)
            // setViewCroix(!viewCroix);
            // setViewRight(!viewRight);
            // setViewRightAdversaire(!viewRightAdversaire);
            setTurn(false);
            return;
        } else {
            p = TranslateDimension(p);
            let found: boolean = false;
            maList.forEach(element => {
                if (element.x == p.x && element.y == p.y) {
                    found = true;
                }
            });

            if (!found && maList.length < maxPlayer) {
                setList([...maList, p])
                console.log(p)
                i++;
            }
            else if (found) {
                let newList = maList.filter(item => (item.x !== p.x || item.y !== p.y));
                setList(newList);
                i--;
            }
        }

    }

    const bottomText = (): string => {
        if (isBegining)
            return text;
        else
            return 'Votre Scores:( ' + maList.length + '/' + maxPlayer + ' )' + 'Score Adverse( ' + otherScore + '/' + maxPlayer + ' )'

    }

    return (<View style={{ height: heightSreen }}>
        {turn && isBegining ? (<TouchableWithoutFeedback onLongPress={onTouch}>
            <View style={styles.container} >
            </View>
        </TouchableWithoutFeedback> ) : (<TouchableWithoutFeedback onLongPress={onTouch}>
            <View style={styles.container} >
            </View>
        </TouchableWithoutFeedback> )}
        <AnimateElement isVisible={viewCroix} onDisappear={setViewCroix} image={Croix} responsePosition={responsePosition} indice={null} />
        <AnimateElement isVisible={viewRight} onDisappear={setViewRight} image={right} responsePosition={responsePosition} indice={1} />
        <AnimateElement isVisible={viewCroixAdversaire} onDisappear={setViewCroixAdversaire} image={Croix} responsePosition={{ top: positionReceive.x, left: positionReceive.y }} indice={null} />
        <AnimateElement isVisible={viewRightAdversaire} onDisappear={setViewRightAdversaire} image={right} responsePosition={{ top: positionReceive.x, left: positionReceive.y }} indice={1} />
        <View style={styles.flatList}>
            <ImageBackground source={gameBackground} style={styles.background}>
                {ImageList(maList)}
            </ImageBackground>
            {isFirstTime && <ActivityIndicator size='large' color={colorTitle}></ActivityIndicator>}
        </View>
        <View style={styles.bottomBar}>
            <Pressable style={{ backgroundColor: '#63b0da', height: '100%', alignItems: 'center' }} onPress={hangleFunction}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{text}</Text>
            </Pressable>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    background: {
        flex: 1,
        resizeMode: 'cover'
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
        width: '100%',
        height: '100%',

    },
    button: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'ligthgreen',
        height: '100%'
    },
    text: {
        color: 'black',
        fontWeight: 'bold'
    },
    bottomBar: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        flex: 1
    }
    ,
    activitieIndicator: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        width: '20%',
        zIndex: 5
    }
})


const Lead = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        flex: 1,
        width: 400
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Game;
export type { Position };