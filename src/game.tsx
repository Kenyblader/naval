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
import { Button, Dimensions, GestureResponderEvent, Pressable, Image, ImageBackground, Animated, StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native";
import ImageList from './imageList';
import gameBackground from './images/beautiful-medieval-fantasy-landscape.jpg'
import Croix from "./images/croix.png"
interface Position {
    x: number
    y: number
}

interface reponseAttack {
    p: Position,
reponse: boolean

}

const Game = () => {
    let ok: Boolean = false;
    const [maList, setList] = useState<Position[]>([]);//liste des joueurs
    const [IaList, setIaList] = useState<Position[]>([]);//liste des joueurs de l'ia
    const [text, setText] = useState('Placer vos joueur sur le terrain');//texte qui affiche le nombre de joueurs
    const [turn, setTurn] = useState(1);//tour de jeu
    const [winner, setWinner] = useState(0);//joueur gagnant
    const [statusJeu, setStatusJeu] = useState(0);//statut du jeu
    const [actionPosition, setActionPosition] = useState<Position>({ x: 0, y: 0 });//position de l'action
    const [actionPositionIA, setActionPositionIA] = useState<Position>({ x: 0, y: 0 });//position de l'action de l'ia
    const [responsePosition, setResponsePosition] = useState<reponseAttack>({ p: { x: 100, y: 100 }, reponse: false });//position de la réponse]
    let a: number = (Dimensions.get('window').width) / 5;
    let b: number = (Dimensions.get('window').height) / 10;

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

    const setPosition = (p: Position) => {
        p = TranslateDimension(p);
        return {
            position: 'absolute',
            top: (p.y + 9),
            left: p.x,
        }
    }

    const generateIaList = () => {

        setIaList(placementAuto(maxPlayer, IaList));
    }

    const placementAuto = (nbJoueur: number, list: Position[]) => {
        let newIaList = [...list]; // Copie de IaList pour éviter les mutations directes
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
        if (found) {
            let newList = IaList.filter(item => item.x !== p.x || item.y !== p.y);
            setResponsePosition({ p: p, reponse: false });
            setIaList(newList)
            setResponsePosition({ p: p, reponse: true });
        }

    }

    useEffect(() => {
        if (statusJeu === 1)
            generateIaList();
    }, [statusJeu]);

    useEffect(() => {
        if (maList.length === maxPlayer) {
        }
    }, [maList]);

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

    return (
        <View style={{ height: '90%' }}>
            {
                statusJeu === 0 && (
                    <TouchableWithoutFeedback onLongPress={onTouch}>
                        <View style={styles.container} />
                    </TouchableWithoutFeedback>
                )
            }
            <TouchableWithoutFeedback onPress={actack}>
                <View style={styles.container} />
            </TouchableWithoutFeedback>
            <Animated.View style={setPosition(responsePosition.p)}>
                <Image source={Croix} style={[{ width: 30, height: 35 }]} />
            </Animated.View>
            <View style={styles.flatList}>
                <ImageBackground source={gameBackground} style={styles.background}>
                    {ImageList(IaList)}
                </ImageBackground>
            </View>
            <View style={styles.bottomBar}>
                <Button title={text} color='rgb(49, 236, 74)' onPress={() => { }} />
                <Pressable style={{ backgroundColor: "black", color: "white", padding: 20 }} onPress={() => { setStatusJeu(1); console.log("jeu lancer avec success") }}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>Test</Text>
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
