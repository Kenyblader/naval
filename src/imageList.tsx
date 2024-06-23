/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */

import { Dimensions, FlatList, Image, View } from "react-native";
import player from './images/guerrier.png';
import { SafeAreaView } from "react-native-safe-area-context";


interface Position {
    x: number
    y: number
}

const ImageList = (maList: Position[]) => {
    let a: number = (Dimensions.get('window').width) / 5;
    let b: number = (Dimensions.get('window').height) / 10;

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
                    <Image source={player} style={{ height: (b - b / 5), width: (a - a / 5) }}  />
                </View>
                } />
        </SafeAreaView>


    );
};

export default ImageList;