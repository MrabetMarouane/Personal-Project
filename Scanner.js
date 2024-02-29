import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';


export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation= useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

   

    const handleBarCodeSanned = ({ type, data }) => {
        setScanned(true);
        //Linking.openURL(data);
        alert(`Bar code with Type ${type} and data ${Linking.openURL(`${data}`)} has been scanned!`);
    };

     // Si la permission de la caméra n'est pas encore accordée, affichez un message de chargement
     if (hasPermission === null) {
        return <Text>Demande de permission d'accès à la caméra...</Text>;
    }
    // Si la permission est refusée, affichez un message indiquant que l'accès à la caméra est nécessaire
    if (hasPermission === false) {
        return <Text>L'accès à la caméra est nécessaire pour utiliser cette fonctionnalité.</Text>;
    }

    // Affichez le scanner de codes-barres
    return (
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeSanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (<Button title='Tap to Scan Again' onPress={() => setScanned(false)} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
