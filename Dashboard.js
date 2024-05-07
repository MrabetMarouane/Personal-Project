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







// CODE FONCTIONNEL : 



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// import { firebase } from '../config';
// import { useNavigation } from '@react-navigation/native';


// const Dashboard = ({route}) => {
//     const [userData, setUserData] = useState({ firstName: '' });
//     const [credit, setCredit] = useState(null);
//     const navigation = useNavigation();
  




//     useEffect(() => {
//         fetchUserData();
//         fetchCredit();
//     }, []);

//     const fetchUserData = async () => {
//         try {
//             const snapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
//             if (snapshot.exists) {
//                 setUserData(snapshot.data());
//             } else {
//                 console.log('Utilisateur connecté(e)');
//                 console.log("the current user is :",currentUser)

//             }
//         } catch (error) {
//             console.error('Erreur lors de la récupération des données utilisateur :', error);
//         }
//     };

//     const fetchCredit = async () => {
//         try {
//             const response = await fetch(`http://192.168.5.172:3000/users?UID=${firebase.auth().currentUser.uid}`);
//             const data = await response.json();
//             const foundUser = data.find(user => user.UID === firebase.auth().currentUser.uid);
//             if (foundUser) {
//                 setCredit(foundUser.credit);
//                 console.log("Current user's credit in Watt is : ",credit)
//                 setUserData({ ...userData, firstName: foundUser.firstName }); // Mettre à jour le nom de l'utilisateur

//                 let nomchercher = "Prise 1";
//                 console.log(nomchercher);

//                 //  arret = setInterval(function () {
//                     fetch(`http://192.168.5.172:3000/prise?nom=${nomchercher}`)
//                         .then(response => response.json())
//                         .then(data => {
//                             let foundPrise = data.find(prise => prise.nomPrise === nomchercher);
//                             if (foundPrise) {
//                                 console.log(foundPrise);
//                                 id = foundPrise.id;

//                                 let total_debut = foundPrise.total_debut;
//                                 let total = foundPrise.total;
//                                 let credit = foundUser.credit;
//                                 console.log(total_debut,total)

//                                 if (total > total_debut) {
                                    
//                                         let consommationCredit = total - total_debut;
//                                         console.log("consommationCredit :", consommationCredit)
//                                         console.log("credit :", credit)
//                                         console.log(`consommationCredit : ${total} - ${total_debut} = ${consommationCredit}`)
                    
//                                         let credit_total = credit - consommationCredit;
                    
//                                         console.log("total Credit :" , credit_total)
//                                         console.log(`credit_total : ${credit} - ${consommationCredit} = ${credit_total}`)

//                                         setCredit(credit_total.toFixed(3));
                    
                    
//                                 }else {console.error('Erreur lors de la récupération du crédit :', error)};


//                             }

//                         })
//                          //.catch(error => console.error('Erreur lors de l\'activation de la prise:', error));

//                 //  }, 2000);


//                  const requestOptions = {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({credit: credit_total })
//                 };

//                 // Send PATCH request
//                 fetch(`http://192.168.5.172:3000/users/${firebase.auth().currentUser.uid}`, requestOptions)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         return response.json();
//                     })
//                     .then(data => {
//                         console.log('PATCH request successful:', data);

//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                         alert('An error occurred while processing the request. Please try again later.');
//                     });


//             } else {
//                 console.log("Utilisateur non trouvé");
//             }
//         } catch (error) {
//             console.error('Erreur lors de la récupération du crédit :', error);
//         }
//     };

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
//             <View style={styles.userInfoContainer}>
//                 <Text style={styles.userInfoText}>
//                     Bonjour, <Text style={styles.userName}>{userData.firstName}</Text>
//                 </Text>

//                 <Text style={styles.userInfoText}>
//                     Votre crédit  : <Text style={styles.creditAmount}>{credit + "\ Watt"}</Text>
//                 </Text>
//             </View>
            
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('Scanner')}
//                 style={styles.button}
//             >
//                 <Text style={styles.buttonText}>Scanner</Text>
//             </TouchableOpacity>
    
//             <TouchableOpacity
//                 onPress={changePassword}
//                 style={styles.button}
//             >
//                 <Text style={styles.buttonText}>Changer le mot de passe</Text>
//             </TouchableOpacity>
    
//             <TouchableOpacity
//                 onPress={() => firebase.auth().signOut()}
//                 style={styles.button}
//             >
//                 <Text style={styles.buttonText}>Déconnexion</Text>
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
//     userInfoContainer: {
//         alignItems: 'center',
//         marginBottom: 30,
//     },
//     userInfoText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     userName: {
//         color: '#026efd',
//     },
//     creditAmount: {
//         color: '#008000',
//     },
//     button: {
//         marginTop: 20,
//         height: 50,
//         width: 200,
//         backgroundColor: '#026efd',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 25,
//     },
//     buttonText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });















































