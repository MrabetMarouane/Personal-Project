// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const RechargePaypal = () => {
//   const [amount, setAmount] = useState(0);
//   const [total, setTotal] = useState(0);
//   const webviewRef = useRef(null);

//   useEffect(() => {
//     setTotal((amount * 0.2516).toFixed(2));
//   }, [amount]);

//   const handleInputChange = (value) => {
//     setAmount(parseFloat(value) || 0);
//   };

//   const handleMessage = (event) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'PAYPAL_SCRIPT_LOADED') {
//       // PayPal script loaded, you can perform actions if needed
//     } else if (data.type === 'TRANSACTION_COMPLETED') {
//       alert(`Transaction completed by ${data.details.id}`);
//     }
//   };

//   const injectedJavaScript = `
//     document.getElementById('amount').addEventListener('input', function() {
//       const total = this.value * 0.2516;
//       document.getElementById('euros').textContent = total.toFixed(2);
//     });

//     paypal.Buttons({
//       createOrder: function(data, actions) {
//         return actions.order.create({
//           purchase_units: [{
//             amount: {
//               value: (document.getElementById('amount').value * 0.2516).toFixed(2),
//             },
//           }],
//         });
//       },
//       onApprove: function(data, actions) {
//         return actions.order.capture().then(function(details) {
//           window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'TRANSACTION_COMPLETED', details }));
//         });
//       },
//     }).render('#paypal');

//     window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'PAYPAL_SCRIPT_LOADED' }));
//   `;

//   return (
//     <View style={styles.container}>
//       <Text>Watts :</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="numeric"
//         onChangeText={handleInputChange}
//       />
//       <View style={styles.result}>
//         <Text>Total :</Text>
//         <Text>{total}€</Text>
//       </View>
//       <WebView
//         ref={webviewRef}
//         originWhitelist={['*']}
//         source={{ html: `
//           <!DOCTYPE html>
//           <html lang="en">
//           <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//             <script src="https://www.paypal.com/sdk/js?client-id=AWPtI3k5QNFmEOZWW3kOP9tbp8ezQBj3-rz1n-xonY5pMqOVp1NiTIwe1Ux_ZlBQRKpafg7laoFcm_sy"></script>
//           </head>
//           <body>
//             <input type="number" id="amount" />
//             <div id="resultat">
//               Total: <span id="euros">0</span>€
//             </div>
//             <div id="paypal"></div>
//             <script>
//               ${injectedJavaScript}
//             </script>
//           </body>
//           </html>
//         ` }}
//         javaScriptEnabled
//         onMessage={handleMessage}
//         style={styles.webview}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   result: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   webview: {
//     height: 400,
//     width: '100%',
//   },
// });

// export default RechargePaypal;






//_______________________________________________________________________________________________



import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';

const RechargePaypal = () => {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [ModalVisible, setModalVisible] = useState(false);
  const webviewRef = useRef(null);

  useEffect(() => {
    setTotal((amount * 0.2516).toFixed(2)); //  Prix de 1 watt
  }, [amount]);

  const handleInputChange = (value) => {
    setAmount(parseFloat(value) || 0);
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'PAYPAL_SCRIPT_LOADED') {
      // PayPal script loaded, you can perform actions if needed
    } else if (data.type === 'TRANSACTION_COMPLETED') {
      alert(`Transaction completed by ${data.details.id}`);
      setModalVisible(false);
    }
  };

  const injectedJavaScript = `
    document.getElementById('amount').addEventListener('input', function() {
      const total = this.value * 0.2516;
      document.getElementById('euros').textContent = total.toFixed(2);
    });

    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: (document.getElementById('amount').value * 0.2516).toFixed(2),
            },
          }],
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'TRANSACTION_COMPLETED', details }));
        });
      },
    }).render('#paypal');

    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'PAYPAL_SCRIPT_LOADED' }));
  `;

  return (
    <View style={styles.container}>
      <Text>Watts :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleInputChange}
      />
      <View style={styles.result}>
        <Text>Total :</Text>
        <Text>{total}€</Text>
      </View>
      <Button title="Payer avec PayPal" onPress={() => setModalVisible(true)} />
      <Modal isVisible={ModalVisible}>
        <View style={styles.modalContent}>
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            source={{ html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script src="https://www.paypal.com/sdk/js?client-id=AWPtI3k5QNFmEOZWW3kOP9tbp8ezQBj3-rz1n-xonY5pMqOVp1NiTIwe1Ux_ZlBQRKpafg7laoFcm_sy"></script>
              </head>
              <body>
                <input type="number" id="amount" />
                <div id="resultat">
                  Total: <span id="euros">0</span>€
                </div>
                <div id="paypal"></div>
                <script>
                  ${injectedJavaScript}
                </script>
              </body>
              </html>
            ` }}
            javaScriptEnabled
            onMessage={handleMessage}
            style={styles.webview}
          />
          <Button title="Fermer" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  webview: {
    height: 400,
    width: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RechargePaypal;







