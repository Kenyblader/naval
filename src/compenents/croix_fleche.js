/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from 'react';
import { Image, Animated, StyleSheet } from 'react-native';

const BlinkingCharacter = ({ isVisible, onDisappear, image, responsePosition, indice }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            startBlinking();
        }
    }, [isVisible]);

    const startBlinking = () => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Après le clignotement, informer le parent que l'animation est terminée
            onDisappear(!isVisible);
        });
    };

    return (
        <Animated.View style={[styles.character, { opacity }, responsePosition]}>
            <Image source={image} style={!indice ? styles.croix : styles.fleche} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    character: {
        position: 'absolute',
        width: 100,
        height: 100,
    },
    croix: {
        width: 30,
        height: 35,
    },
    fleche:
    {
        width: 69,
        height: 35,
    },
});

export default BlinkingCharacter;
