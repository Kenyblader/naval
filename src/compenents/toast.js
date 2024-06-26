/* eslint-disable prettier/prettier */


import React from 'react';
import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2, dir) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        position: dir ? dir : 'top',
        visibilityTime: 6000, // Durée de visibilité
        autoHide: true, // Auto hide after visibilityTime
        bottomOffset: 40, // Distance from the bottom
        onPress: () => { console.log('Toast Pressed') }, // Action on press
    });
};


const ToastModule = () => {
    return <Toast ref={(ref) => Toast.setRef(ref)} />;
};

export { showToast, ToastModule };
