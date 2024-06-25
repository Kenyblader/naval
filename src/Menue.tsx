import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Carousel from "react-native-snap-carousel";
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import war_local from './images/war_Local.png';
import logo from "./images/20ppi/logo.png";
import war_online from "./images/war_onLine.png";
import Exit from "./images/EmergencyExit.png";

const { width: screenWidth } = Dimensions.get('window');

const Menue = ({ navigation }: { navigation: any }) => {
    const Deconnexion = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const showConfirmDialog = () => {
        Alert.alert(
            "Confirmation",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Déconnexion annulée"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => Deconnexion()
                }
            ]
        );
    };


    const data = [
        {
            title: 'Jouer en local',
            sub_title: "Description :",
            description: 'Mesurez-vous contre l\'IA et montrez votre domination',
            image: war_local, // Corrected to use the imported image directly
            text_boutton: "Commencer",
            action: () => { navigation.navigate("Partie") }
        },
        {
            title: 'Jouer en Ligne',
            sub_title: "Description :",
            description: 'Jouez avec des amis afin de leur montrer qui est le plus stratégique',
            image: war_online, // Corrected to use the imported image directly
            text_boutton: "Jouer",
            action: () => { navigation.navigate("Partie") }
        }
        // Add more items if needed
    ];

    const renderItem = ({ item, index }: any) => (
        <Card style={styles.card} key={index}>
            <Card.Cover style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} source={item.image} />
            <Card.Content>
                <Title style={styles.cardTitle}>{item.title}</Title>
                <Paragraph style={{ marginBottom: 20, textAlign: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>{item.sub_title}</Text>{item.description}
                </Paragraph>
                <Button mode="contained" labelStyle={{ fontWeight: "bold" }} style={styles.playButton} onPress={() => { item.action() }}>
                    {item.text_boutton}
                </Button>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.logoutButton} onPress={() => showConfirmDialog()}>
                <Image source={Exit} style={styles.logoutIcon} />

            </TouchableOpacity>
            <Image style={styles.logo} source={logo} />
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
        marginTop: 90,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "black",
        marginTop: 10,
    },
    card: {
        borderRadius: 10,
        height: 400,
    },
    cardTitle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    playButton: {
        backgroundColor: '#3A4DE5',
        width: "60%",
        margin: "auto",
    },
    logoutButton: {
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 10,
        position: "absolute",
        right: 10,
        top: 10,
        flex: 1
    },
    logoutIcon: {
        width: 24,
        height: 24,
        flex: 1,
    },
});

export default Menue;
