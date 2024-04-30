


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importer la bibliothèque axios
import { Linking } from 'react-native';


export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();
    const [extractedData, setExtractedData] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        if (data.startsWith('https://')) {
            // Si le QR Code contient un lien HTTPS, le transfert vers le lien s'effectue
            Linking.openURL(data);
        } else {
            // Sinon, affichez les données du QR Code dans une alerte
            alert(`Bar code with Type ${type} and data :\n ${data}\n has been scanned!`);


            const extracted = data.slice(19, 47); // Slice de l'indice 19 à l'indice 46 inclus
            setExtractedData(extracted);

            console.log(extracted);
            
        }
   
    };


    let id_prise = extractedData;
    
    // Fonction pour activer la prise
    const activaterPrise = async () => {

        const action = "on";
        const id = id_prise;
        console.log(id);

        fetch('http://192.168.5.172:3000/switch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: action, id: id })
        })
        
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur lors de l\'activation de la prise:', error));
        alert('Prise activée !');

        // try {
        //     const response = await axios.get('http://192.168.5.67/rpc/Switch.Set?id=0&on=true');
        //     console.log(response.data); // Affiche la réponse de la requête HTTP
        //     alert('Prise activée !');
        // } catch (error) {
        //     console.error('Erreur lors de l\'activation de la prise:', error);
        //     alert('Erreur lors de l\'activation de la prise');
        // }
    };

    // Fonction pour désactiver la prise
    const desactivaterPrise = async () => {
        
        
        const action = "off";
        const id = id_prise;

        fetch('http://192.168.5.172:3000/switch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: action, id: id })
        })
        
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur lors de la désactivation de la prise:', error));
        alert('Prise désactivée !');
        
        
        
        
        // try {
        //     const response = await axios.get('http://192.168.5.67/rpc/Switch.Set?id=0&on=false');
        //     console.log(response.data); // Affiche la réponse de la requête HTTP
        //     alert('Prise désactivée !');
        // } 
        // catch (error) {
        //     console.error('Erreur lors de la désactivation de la prise:', error);
        //     alert('Erreur lors de la désactivation de la prise');
        // }
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
                    <Button title='Tapez pour scanner à nouveau' onPress={() => setScanned(false)} />
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


