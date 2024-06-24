/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable jsx-quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Button, Dimensions, GestureResponderEvent, ImageBackground, Animated, StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native";
import ImageList from './imageList';
import gameBackground from './images/beautiful-medieval-fantasy-landscape.jpg';
import Croix from "./images/croix.png";
import right from "./images/Fleche.png";
import AnimateElement from "./compenents/croix_fleche";
import MyModal from "./compenents/Modal";
import firestore from '@react-native-firebase/firestore';
interface Position {
    x: number | any
    y: number | any
}

interface reponseAttack {
    top: number
    left: number,
    reponse: boolean
}

const Game = () => {
    let ok: Boolean = false;

    const [maList, setList] = useState<Position[]>([]);//liste des joueurs
    const [IaList, setIaList] = useState<Position[]>([]);//liste des joueurs de l'ia
    const [text, setText] = useState('Placer vos joueur sur le terrain');//texte qui affiche le nombre de joueurs
    const [turn, setTurn] = useState(true);//tour de jeu
    const [winner, setWinner] = useState(0);//joueur gagnant
    const [statusJeu, setStatusJeu] = useState(0);//statut du jeu
    const [responsePosition, setResponsePosition] = useState({ top: 0, left: 0 });
    const [responsePositionIA, setReponsePositionIA] = useState({ top: 0, left: 0 });
    const [viewCroix, setViewCroix] = useState(false);
    const [viewRight, setViewRight] = useState(false);
    const [viewCroixIA, setViewCroixIA] = useState(false);
    const [viewRightIA, setViewRightIA] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const gridWidth = screenWidth * 0.9;
    const gridHeight = screenHeight * 0.9;

    const a = gridWidth / 5;
    const b = gridHeight / 10;

    const maxPlayer = 10;

    const TranslateDimension = (p: Position): Position => {
        let x2 = p.x;
        let y2 = p.y;

        x2 = (x2 < 0) ? 0 : x2; // vérifier que x2 est dans la zone de jeu du côté gauche
        x2 = (x2 > 5 * a) ? 4 * a : x2; // vérifier que x2 est dans la zone de jeu du côté droit

        y2 = (y2 < 0) ? 0 : y2; // vérifier que y2 est dans la zone de jeu du côté haut
        y2 = (y2 > 10 * b) ? 9 * b : y2; // vérifier que y2 est dans la zone de jeu du côté bas

        let pre: number = 0; // variable qui stocke la valeur de x2

        for (let i = 1; i <= 5; i++) { // pour chaque case du terrain de jeu, on doit trouver à quelle case de la matrice appartient x2 sur l'axe des abscisses
            let val = a * i;
            if (val > x2) {
                x2 = pre;
                break;
            }
            pre = val; // on stocke la valeur de x2 dans pre pour la prochaine itération de la boucle
        }
        pre = 0; // on réinitialise pre pour la prochaine itération de la boucle

        for (let i = 1; i <= 10; i++) { // pour chaque case du terrain de jeu, on doit trouver à quelle case de la matrice appartient y2 sur l'axe des ordonnées
            let val = i * b;
            if (y2 < val) {
                y2 = pre;
                break;
            }
            pre = val;
        }

        return { x: x2, y: y2 };
    }



    const generateIaList = () => {

        setIaList(placementAuto(maxPlayer, IaList));
    }
    const placementAuto = (nbJoueur: number, list: Position[]) => {
        let newIaList = [...list];
        while (newIaList.length < nbJoueur) {
            let x = a + Math.random() * (a * 5);
            let y = b + Math.random() * (b * 10);
            let p: Position = { x: x, y: y };
            p = TranslateDimension(p);

            let found = newIaList.some(element => element.x === p.x && element.y === p.y);

            if (!found) {
                newIaList.push(p);
            }
        }
        list = newIaList;
        return list;
    }

    const actack = (event: GestureResponderEvent) => {
        let p: Position = { x: event.nativeEvent.locationX, y: event.nativeEvent.locationY };
        p = TranslateDimension(p);
        let found = IaList.some(element => element.x === p.x && element.y === p.y);
        setResponsePosition({ top: p.y, left: p.x });

        if (found) {
            let newList = IaList.filter(item => item.x !== p.x || item.y !== p.y);
            setIaList(newList)
            setViewRight(!viewRight)
        }
        else {
            setViewCroix(!viewCroix);
        }
        console.log(p.x, p.y)
        setTurn(!turn);
    }
    const actackIA = () => {

        let x = a + Math.random() * (a * 5);
        let y = b + Math.random() * (b * 10);
        let p: Position = { x: x, y: y };
        p = TranslateDimension(p);
        let found = maList.some(element => element.x === p.x && element.y === p.y);
        setReponsePositionIA({ top: p.y, left: p.x });

        if (found) {
            let newList = maList.filter(item => item.x !== p.x || item.y !== p.y);
            setList(newList)
            setViewRightIA(!viewRightIA)
        }
        else {
            setViewCroixIA(!viewCroixIA);
        }
        console.log(p.x, p.y)
        setTurn(!turn);

    }

    useEffect(() => {
        if (statusJeu === 2)
            generateIaList();
    }, [statusJeu]);


    useEffect(() => {
        if (maList.length === 0 && statusJeu === 2) {
            setStatusJeu(0);
        }
        else if (maList.length === maxPlayer) {
            setStatusJeu(1);
        }
    }, [maList]);

    useEffect(() => {
        if (statusJeu === 2) {
            if (turn === false) {
                setTimeout(() => {
                    actackIA();
                }, 1000);
            }
        }
    }, [turn])


    const onTouch = (event: GestureResponderEvent) => {
        if (ok)
            return;
        let i = maList.length;
        let p: Position = { x: event.nativeEvent.locationX, y: event.nativeEvent.locationY };
        p = TranslateDimension(p);

        let found: boolean = maList.some(element => element.x === p.x && element.y === p.y);

        if (!found && maList.length < maxPlayer) {
            setList([...maList, p]);
            i++;
        } else if (found) {
            let newList = maList.filter(item => item.x !== p.x || item.y !== p.y);
            setList(newList);
            i--;
        }

        setText(`${i}/${maxPlayer}`);
    }

    const relancer_La_Partie = () => {
        setStatusJeu(0);
        setWinner(0);
        setTurn(true);
        setIaList([]);
        setList([]);
        setText("Placer vos joueur sur le terrain");
    }

    const confirmRelancementJeu = () => {
        return (
            <>
                <MyModal visible={confirm} onClose={() => { setConfirm(!confirm) }} title={"Navale"} message={"Voulez-vous vraiment recommancer le jeu ?"} onPress={() => { relancer_La_Partie() }} info={false} text1={"Oui"} text2={"Non"} />

            </>
        )
    }


    const whichWinner = (element: number, message?: string, title?: string) => {
        switch (element) {
            case 1:
                return (
                    <MyModal visible={modalVisible} onClose={() => { setModalVisible(!modalVisible) }} title={title ? title : "Navale"} message={message ? message : "Vous avez gagné"} onPress={() => { relancer_La_Partie() }} info={true} text1={"Nouvelle Partie"} text2={""} />
                )
            case 2:
                return (
                    <MyModal visible={modalVisible} onClose={() => { setModalVisible(!modalVisible) }} title={title ? title : "Navale"} message={message ? message : "Vous avez perdu déso voulez relancer la partie"} onPress={() => { relancer_La_Partie() }} info={true} text1={"Nouvelle Partie"} text2={""} />
                )
            default:
                return null;
        }

    }
    useEffect(() => {
        if (IaList.length === 0 && statusJeu === 2) {
            setWinner(1);
            setStatusJeu(0);
            setModalVisible(true);
        }
        else if (maList.length === 0 && statusJeu === 2) {
            setWinner(2);
            setStatusJeu(0);
            setModalVisible(true);
        }
    }, [IaList, maList])

    const renderEtapePartie = (state: any) => {


        switch (state) {
            case 0:
                return (
                    <>
                        <TouchableWithoutFeedback onLongPress={onTouch}>
                            <View style={styles.container} />
                        </TouchableWithoutFeedback>
                        <View style={styles.bottomBar}>
                            <Button title={text} color='black' onPress={() => { }} />

                            <Button title="Replacer les joueurs" color='rgb(49, 236, 74)' onPress={() => { setList([]); setStatusJeu(0); setText("Placer vos joueur sur le terrain") }} />

                        </View>
                    </>
                )
            case 1:
                return (
                    <>
                        <TouchableWithoutFeedback onLongPress={onTouch}>
                            <View style={styles.container} />
                        </TouchableWithoutFeedback>
                        <View style={styles.bottomBar}>
                            <Button title="Lancer la partie" color='black' onPress={() => { setStatusJeu(2) }} />
                            <Button title="Replacer les joueurs" color='rgb(49, 236, 74)' onPress={() => { setList([]); setStatusJeu(0) }} />

                        </View>
                    </>
                )
            case 2: {
                const text1 = "Nombre de joueur :" + maList.length;
                const text2 = " Nombre d'IA restante :" + IaList.length;
                return (
                    <>
                        {turn && (<TouchableWithoutFeedback onPress={actack}>
                            <View style={styles.container} />
                        </TouchableWithoutFeedback>)}
                        <AnimateElement isVisible={viewCroix} onDisappear={setViewCroix} image={Croix} responsePosition={responsePosition} indice={null} />
                        <AnimateElement isVisible={viewRight} onDisappear={setViewRight} image={right} responsePosition={responsePosition} indice={1} />
                        <AnimateElement isVisible={viewCroixIA} onDisappear={setViewCroixIA} image={Croix} responsePosition={responsePositionIA} indice={null} />
                        <AnimateElement isVisible={viewRightIA} onDisappear={setViewRightIA} image={right} responsePosition={responsePositionIA} indice={1} />
                        <View style={styles.bottomBar}>
                            <Button title="Recommencer" color='black' onPress={() => { setConfirm(!confirm) }} />
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", backgroundColor: "rgb(49, 236, 74)", padding: 20 }}>
                                <Text style={{ color: "white" }}>
                                    {text1}
                                </Text>
                                <Text style={{ color: "white" }}>
                                    {text2}
                                </Text>
                            </View>
                        </View>
                    </>

                )
            }
            default:
                return null;
        }
    }

    return (
        <View style={{ height: '90%' }}>
            {
                renderEtapePartie(statusJeu)
            }

            {
                whichWinner(winner)
            }
            {
                confirmRelancementJeu()
            }
            <View style={styles.flatList}>
                <ImageBackground source={gameBackground} style={styles.background}>
                    {ImageList(maList)}
                </ImageBackground>
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
        backgroundColor: 'rgba(255, 255, 255, 0.048)',
    },
    fleche:
    {
        width: 69,
        height: 35
    },
    croix:
    {
        width: 30, height: 35
    },
    background: {
        flex: 1,
        resizeMode: 'cover'
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
    bottomBar: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        backgroundColor: 'red',
        flex: 1
    }
});

export default Game;
export type { Position, reponseAttack };
