import { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import player from './images/guerrier.png';
import { SafeAreaView } from "react-native-safe-area-context";


interface Position {
    x: number
    y: number
}






const ImageList = (maList: Position[]) => {
    let a: number = (Dimensions.get('window').width) / 5;
    let b: number = (Dimensions.get('window').height) / 10;

    let styles = StyleSheet.create({
        image: {
            height: (b - b / 5),
            width: (a - a / 5),
        }
    })
    let [text, setText] = useState('');

    const setPosition = (p: Position) => {

        return {
            position: 'absolute',
            top: p.y,
            left: p.x,
            height: (b),
            width: (a)
        }
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList data={maList} contentContainerStyle={{ flexGrow: 1, borderWidth: 1 }}
                renderItem={(item) => <View style={setPosition(item.item)} >
                    <Image source={player} style={{ height: (b - b / 5), width: (a - a / 5), }} ></Image>
                </View>
                } />
        </SafeAreaView>


    );
}

export default ImageList;