import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const [userData, setUserData] = useState({ firstName: '' });
    const [credit, setCredit] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchUserData();
        fetchCredit();
    }, []);

    const fetchUserData = async () => {
        try {
            const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
            if (snapshot.exists) {
                setUserData(snapshot.data());
            } else {
                console.log('Utilisateur connecté(e)');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur :', error);
        }
    };

    const fetchCredit = async () => {
        try {
            const response = await fetch(`http://192.168.5.172:3000/users?UID=${firebase.auth().currentUser.uid}`);
            const data = await response.json();
            const foundUser = data.find(user => user.UID === firebase.auth().currentUser.uid);
            if (foundUser) {
                setCredit(foundUser.credit);
                setUserData({ ...userData, firstName: foundUser.firstName }); // Mettre à jour le nom de l'utilisateur
            } else {
                console.log("Utilisateur non trouvé");
                // Handle user not found scenario
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du crédit :', error);
        }
    };

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
            .then(() => {
                alert("Email de réinitialisation du mot de passe envoyé !");
            }).catch((error) => {
                alert(error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoText}>
                    Bonjour, <Text style={styles.userName}>{userData.firstName}</Text>
                </Text>
                <Text style={styles.userInfoText}>
                    Votre crédit est : <Text style={styles.creditAmount}>{credit}</Text>
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('RechargeCredit')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Recharger votre solde</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
                onPress={() => navigation.navigate('Scanner')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
                onPress={changePassword}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Changer le mot de passe</Text>
            </TouchableOpacity>
    
            <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
    
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    userInfoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userName: {
        color: '#026efd',
    },
    creditAmount: {
        color: '#008000',
    },
    button: {
        marginTop: 20,
        height: 50,
        width: 200,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});




































//__________________________________________________________________________________________//



// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native'
// import React, { useState, useEffect}from 'react'
// import { firebase} from '../config' 

// import { useNavigation } from '@react-navigation/native';


// const Dashboard = () => {
//     const [name, setName] = useState([]);
//     const navigation = useNavigation();

//     //CHANGER LE MOT DE PASSE 
//     const changePassword = () =>{
//         firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
//         .then(() => {
//             alert("Email de réinitialisation du mot de passe envoyé !")
//         }).catch((error) => {
//             alert(error)
//         })
//     }

//     useEffect(() => {
//         firebase.firestore().collection('users')
//         .doc(firebase.auth().currentUser.uid).get()
//         .then((snapshot) => {
//             if(snapshot.exists){
//                 setName(snapshot.data())
//             }
//             else {
//                 console.log('Utilisateur connecté(e)')
//             }
//         })
//     }, [])
//     return (
//         <SafeAreaView style = {styles.container}>

//             <Text style = {{fontSize:20, fontWeight : 'bold'}}>
//                 Bonjour, {name.firstName}
//             </Text>

//             <Text style = {{fontSize:20, fontWeight : 'bold'}}>
//                 Votre credit est : {
//                     fetch(`http://192.168.5.172:3000/users?UID=${userUID}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         // console.log(data);
//                         let foundUser = data.find(user => user.UID === userUID);
//                         if (foundUser) {
//                             console.log(foundUser);
//                             let creditElement = document.getElementById('credit');
//                             creditElement.textContent = foundUser.credit;
//                         } else {
//                             console.log("Utilisateur non trouvé");
//                             // 如果未找到，可能需要执行某些操作，例如显示错误消息
//                         }
//                     })
//                     .catch(error => console.error('Erreur :', error))
//                 }
//             </Text>

//             <TouchableOpacity
//                onPress={() => navigation.navigate('Scanner')}
//                style={styles.button}             

//             >
//                 <Text style = {{fontSize:22, fontWeight : 'bold'}}>
//                 Scanner 
//                 </Text>
    
//             </TouchableOpacity>

//             <TouchableOpacity
//                onPress={() => {
//                 changePassword()
//             }}
//                style={styles.button}             

//             >
//                 <Text style = {{fontSize:22, fontWeight : 'bold'}}>
//                 Changer le mot de passe
//                 </Text>
    
//             </TouchableOpacity>

//             <TouchableOpacity
//                onPress={() => {firebase.auth().signOut()}}
//                style={styles.button}             

//             >
//                 <Text style = {{fontSize:22, fontWeight : 'bold'}}>
//                 Deconnexion
//                 </Text>
    
//             </TouchableOpacity>

            
//         </SafeAreaView>
//     )
    
// }

// export default Dashboard

// const styles = StyleSheet.create({
//     container : {
//         flex : 1,
//         alignItems : 'center',
//         marginTop : 100,
//     },
   
//     button : {
//         marginTop :50,
//         height : 70,
//         width : 250,
//         backgroundColor : '#026efd',
//         alignItems : 'center',
//         justifyContent: 'center',
//         borderRadius : 50,
//     }
// })































//__________________________________________________________________________________________//


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// import { firebase } from '../config';
// import { useNavigation } from '@react-navigation/native';

// const Dashboard = () => {
//     const [name, setName] = useState({});
//     const [credit, setCredit] = useState(null); // State for credit
//     const navigation = useNavigation();

//     // Fetch credit when component mounts
//     useEffect(() => {
//         fetchCredit();
//     }, []);

//     // Function to fetch credit
//     const fetchCredit = async () => {
//         try {
//             const response = await fetch(`http://192.168.5.172:3000/users?UID=${firebase.auth().currentUser.uid}`);
//             const data = await response.json();
//             const foundUser = data.find(user => user.UID === firebase.auth().currentUser.uid);
//             if (foundUser) {
//                 setCredit(foundUser.credit);
//             } else {
//                 console.log("Utilisateur non trouvé");
//                 // Handle user not found scenario
//             }
//         } catch (error) {
//             console.error('Erreur :', error);
//         }
//     };

//     //CHANGER LE MOT DE PASSE 
//     const changePassword = () => {
//         firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
//             .then(() => {
//                 alert("Email de réinitialisation du mot de passe envoyé !");
//             }).catch((error) => {
//                 alert(error);
//             });
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
//                 Bonjour, {name.firstName}
//             </Text>

//             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
//                 Votre credit est : {credit}
//             </Text>

//             <TouchableOpacity
//                 onPress={() => navigation.navigate('Scanner')}
//                 style={styles.button}
//             >
//                 <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Scanner</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={changePassword}
//                 style={styles.button}
//             >
//                 <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Changer le mot de passe</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 onPress={() => firebase.auth().signOut()}
//                 style={styles.button}
//             >
//                 <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Deconnexion</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: 100,
//     },
//     button: {
//         marginTop: 50,
//         height: 70,
//         width: 250,
//         backgroundColor: '#026efd',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 50,
//     },
// });


























































