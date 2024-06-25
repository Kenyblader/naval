import React, { act, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from "react-native-snap-carousel";
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import war_local from './images/war_Local.png';
import logo from "./images/20ppi/logo.png"
import war from "./images/war.jpg";
import war_online from "./images/war_onLine.png";
const { width: screenWidth } = Dimensions.get('window');


const Menue = ({ navigation }: { navigation: any }) => {

    const [whichPage, setWhichPage] = useState(0);
    const carouselRef = useRef(null);

    const data = [
        {
            title: 'Jouer en local',
            sub_title: "Description :",
            description: ' Mesurer vous contre l\'IA et montrer votre domination',
            image: war_local, // Corrected to use the imported image directly
            text_boutton: "Commencer",
            action: () => { navigation.navigate("Partie") }
        },
        {
            title: 'Jouer en Ligne',
            sub_title: "Description :",
            description: 'Joueur avec de amies afin de leurs montrer qui est le plus strategique',
            image: war_online, // Corrected to use the imported image directly
            text_boutton: "Joueur",
            action: () => { navigation.navigate("Partie") }
        }
        // Add more items if needed
    ];


    const renderItem = ({ item, index }: any) => (
        <Card style={styles.card} key={index}>
            <Card.Cover style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} source={item.image} />
            <Card.Content>
                <Title style={styles.cardTitle}>{item.title}</Title>
                <Paragraph style={{ marginBottom: 20, textAlign: "center" }}><Text style={{ fontWeight: "bold" }}>{item.sub_title}</Text>{item.description}</Paragraph>
                <Button mode="contained" labelStyle={{ fontWeight: "bold" }} style={styles.playButton} onPress={() => { item.action() }}>
                    {item.text_boutton}
                </Button>
            </Card.Content>

        </Card>


    );

    return (
        <View style={styles.container}>
            <Image style={{ marginTop: 90 }} source={logo} />
            <Text style={styles.menuTitle}>Menu</Text>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.75}
                loop={true}
                removeClippedSubviews={false}
            />
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "black",
        marginTop: 10
    },
    card: {
        borderRadius: 10,
        height:400
    },
    cardTitle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    playButton: {
        backgroundColor: '#3A4DE5',
        width:"60%",
        margin:"auto",
    },
});

export default Menue;
