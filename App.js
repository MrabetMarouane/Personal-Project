import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import { Camera } from "expo-camera";

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";
import Scanner from "./src/Scanner";
import RechargeCredit from "./src/RechargeCredit";

//import { Stack } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Accueil"
              component={Login}
              options={{
                headerTitle: () => <Header name="Recharge Hub" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerTitle: () => <Header name="Recharge Hub" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
    
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerTitle: () => <Header name="Accueil" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            <Stack.Screen
              name="Scanner"
              component={Scanner}
              options={{
                headerTitle: () => <Header name="Scanner" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





//_________________________________________________________________________

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";
import Scanner from "./src/Scanner";
import RechargePaypal from "./src/RechargePaypal";

//import { Stack } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Accueil"
              component={Login}
              options={{
                headerTitle: () => <Header name="Recharge Hub" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerTitle: () => <Header name="Recharge Hub" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
    
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerTitle: () => <Header name="Accueil" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            <Stack.Screen
              name="Scanner"
              component={Scanner}
              options={{
                headerTitle: () => <Header name="Scanner" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
              <Stack.Screen
              name="RechargePaypal"
              component={RechargePaypal}
              options={{
                headerTitle: () => <Header name=" Recharge Paypal" />,
                headerStyle: {
                  height: 150,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
              }}
            />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
