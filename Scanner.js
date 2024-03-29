import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importer la bibliothèque axios

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if (data.startsWith('https://')) {
            // Si le QR Code contient un lien HTTPS, ouvrez le lien
            Linking.openURL(data);
        } else {
            // Sinon, affichez les données du QR Code dans une alerte
            alert(`Bar code with Type ${type} and data :\n ${data}\n has been scanned!`);
        }
    };

    // Fonction pour activer la prise
    const activaterPrise = async () => {
        try {
            const response = await axios.get('http://192.168.5.67/rpc/Switch.Set?id=0&on=true');
            console.log(response.data); // Affiche la réponse de la requête HTTP
            alert('Prise activée !');
        } catch (error) {
            console.error('Erreur lors de l\'activation de la prise:', error);
            alert('Erreur lors de l\'activation de la prise');
        }
    };

    // Fonction pour désactiver la prise
    const desactivaterPrise = async () => {
        try {
            const response = await axios.get('http://192.168.5.67/rpc/Switch.Set?id=0&on=false');
            console.log(response.data); // Affiche la réponse de la requête HTTP
            alert('Prise désactivée !');
        } catch (error) {
            console.error('Erreur lors de la désactivation de la prise:', error);
            alert('Erreur lors de la désactivation de la prise');
        }
    };

    if (hasPermission === null) {
        return <Text>Demande de permission d'accès à la caméra...</Text>;
    }

    if (hasPermission === false) {
        return <Text>L'accès à la caméra est nécessaire pour utiliser cette fonctionnalité.</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View>
                    <Button title='Tap to Scan Again' onPress={() => setScanned(false)} />
                    <Button title='Activer la prise' onPress={activaterPrise} />
                    <Button title='Désactiver la prise' onPress={desactivaterPrise} />
                </View>
            )}
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
