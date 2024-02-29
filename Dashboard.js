import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect}from 'react'
import { firebase} from '../config' 

import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {
    const [name, setName] = useState([]);
    const navigation = useNavigation();

    //CHANGER LE MOT DE PASSE 
    const changePassword = () =>{
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("Email de réinitialisation du mot de passe envoyé !")
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('Utilisateur connecté(e)')
            }
        })
    }, [])
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {{fontSize:20, fontWeight : 'bold'}}>
                Bonjour, {name.firstName}
            </Text>

            <TouchableOpacity
               onPress={() => navigation.navigate('Scanner')}
               style={styles.button}             

            >
                <Text style = {{fontSize:22, fontWeight : 'bold'}}>
                Scanner 
                </Text>
    
            </TouchableOpacity>

            <TouchableOpacity
               onPress={() => {
                changePassword()
            }}
               style={styles.button}             

            >
                <Text style = {{fontSize:22, fontWeight : 'bold'}}>
                Changer le mot de passe
                </Text>
    
            </TouchableOpacity>

            <TouchableOpacity
               onPress={() => {firebase.auth().signOut()}}
               style={styles.button}             

            >
                <Text style = {{fontSize:22, fontWeight : 'bold'}}>
                Deconnexion
                </Text>
    
            </TouchableOpacity>

            
        </SafeAreaView>
    )
    
}

export default Dashboard

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        marginTop : 100,
    },
   
    button : {
        marginTop :50,
        height : 70,
        width : 250,
        backgroundColor : '#026efd',
        alignItems : 'center',
        justifyContent: 'center',
        borderRadius : 50,
    }
})
