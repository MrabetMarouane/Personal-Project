import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase} from '../config'

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)   
        } catch (error){
            alert(error.message)
        }
    }

    // Mot de passe oublié

    const forgetPassword = () =>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Email de réinitialisation du mot de passe envoyé !")
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        
        <View style ={styles.container}>
            <Text style ={{fontWeight : 'bold', fontSize : 26}}>
                Connexion
            </Text>
            <View style ={{marginTop : 40}}>
                <TextInput
                    style = {styles.TextInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false} 
                
                />
                <TextInput
                    style = {styles.TextInput}
                    placeholder='Mot de Passe'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false} 
                    secureTextEntry = {true}
                
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            
            >
                <Text style={{fontWeight : 'bold', fontSize: 22}}>Se connecter</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop : 20}}
            
            >
                <Text style={{fontWeight : 'bold', fontSize: 16}}>
                Vous n'avez pas de compte ? S'inscrire 
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {forgetPassword()}}
                style={{marginTop : 20}}
            
            >
                <Text style={{fontWeight : 'bold', fontSize: 16}}>
                 Mot de passe oublié ?
                </Text>

            </TouchableOpacity>
            
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        marginTop : 100,
    },
    TextInput : {
        paddingTop : 20,
        paddingBottom : 10,
        width : 400,
        fontSize: 20,
        borderBottomWidth : 1,
        borderBottomColor : '#000',
        marginBottom : 10,
        textAlign : 'center'
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
