/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from 'react';
import { Image, Animated, StyleSheet } from 'react-native';

const BlinkingCharacter = ({ isHit, onDisappear }) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isHit) {
            // Clignotement
            Animated.loop(
                Animated.sequence([
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
                ]),
                {
                    iterations: 10, // Nombre de clignotements (ici 10)
                }
            ).start();

            // Disparition après 2 secondes
            setTimeout(() => {
                onDisappear();
            }, 2000);
        }
    }, [isHit]);

    return (
        <Animated.View style={[styles.character, { opacity }]}>
            <Image source={require('./images/character.png')} style={styles.image} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    character: {
        position: 'absolute',
        top: 100,
        left: 100,
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default BlinkingCharacter;
