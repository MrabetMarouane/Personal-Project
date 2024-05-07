const credit = document.getElementById("credit");


/********************************Afficher userData*********************************************/
const userData = JSON.parse(sessionStorage.getItem('userData'));


// console.log(userData)
let nom = userData.username;
let userUID = userData.UID; // 将变量名从uid改为UID




// console.log(nom)
// console.log(userUID)


let nomElement = document.getElementById('nom');
nomElement.textContent = `Bienvenue ${nom}`;




/************************************Users****************************************************/




fetch(`http://192.168.5.172:3000/users?UID=${userUID}`)
   .then(response => response.json())
   .then(data => {
       // console.log(data);
       let foundUser = data.find(user => user.UID === userUID);
       if (foundUser) {
           console.log(foundUser);
           credit.textContent = foundUser.credit;


           let valueCredit = foundUser.credit;


           /*************************************Prise*****************************************************/
           const btn0 = document.getElementById("btn0");
           const btn1 = document.getElementById("btn1");
           const nomchercherInput = document.querySelector("#nomchercher");
           let btnchercher = document.getElementById("btnchercher");


           let id = "";


          
           if (valueCredit <= 0) {
               alert("pas energie");
               btnchercher.disabled = true;


           }else{
               btnchercher.disabled = false;


               btnchercher.onclick = function(){


                   const nomchercher = nomchercherInput.value;
                  
                   fetch(`http://192.168.5.172:3000/prise?nom=${nomchercher}`)
                       .then(response => response.json())
                       .then(data => { const requestOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userUID: userUID, credit: credit_total })
                    };
   
                    // Send PATCH request
                    fetch(`http://192.168.5.172:3000/users/${userUID}`, requestOptions)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('PATCH request successful:', data);
                            // Handle successful response here (e.g., update UI)

                            location.reload();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            // Handle errors (e.g., display error message to user)
                            alert('An error occurred while processing the request. Please try again later.');
                        });


                           let foundPrise = data.find(prise => prise.nomPrise === nomchercher);
                           if (foundPrise) {
                               console.log(foundPrise);
                               id = foundPrise.id;
                               btn(foundPrise.total, id); // 调用 btn 函数而不传递任何参数




                               if(btnchercher.innerHTML === "on"){


                                   arret = setInterval(function(){
                                      
                                       fetch(`http://192.168.5.172:3000/prise?nom=${nomchercher}`)
                                           .then(response => response.json())
                                           .then(data => {
                                               let foundPrise = data.find(prise => prise.nomPrise === nomchercher);
                                               if (foundPrise) {
                                                   console.log(foundPrise);
                                                   id = foundPrise.id;


                                                   console.log("btnchercher = on")
                          
                                                   let total_debut = foundPrise.total_debut;
                                                   let total = foundPrise.total;
                          
                                                   if (total > total_debut) {


                                                       console.log("consommation total :" , total)
                                                       console.log("consommation total_debut :" , total_debut)
                                                       console.log("consommation valueCredit :" , valueCredit)
                                                      
                                                       console.log("consommation total est plus grand")
                                                       let credit_total = consommation(total_debut, total, valueCredit);
                                                       console.log(credit_total)


                                                       if(credit_total <=0){
                                                           // Construct PATCH request
                                                           const requestOptions = {
                                                               method: 'PATCH',
                                                               headers: {
                                                                   'Content-Type': 'application/json'
                                                               },
                                                               body: JSON.stringify({ userUID: userUID, credit: credit_total })
                                                           };
                                          
                                                           // Send PATCH request
                                                           fetch(`http://192.168.5.172:3000/users/${userUID}`, requestOptions)
                                                               .then(response => {
                                                                   if (!response.ok) {
                                                                       throw new Error('Network response was not ok');
                                                                   }
                                                                   return response.json();
                                                               })
                                                               .then(data => {
                                                                   console.log('PATCH request successful:', data);
                                                                   // Handle successful response here (e.g., update UI)
                                  
                                                                   location.reload();
                                                               })
                                                               .catch(error => {
                                                                   console.error('Error:', error);
                                                                   // Handle errors (e.g., display error message to user)
                                                                   alert('An error occurred while processing the request. Please try again later.');
                                                               });
                                  
                                                           sendCommand('off');
                                                          


                                                       }
                                      
                                                   } else if (total === total_debut) {
                                                       console.log("consommation total ==")


                                                   } else {
                                                       console.log("error")
                                                   }
                                              
                              
                                               } else {
                                                   console.log("Not found");
                                                   // 如果未找到，可能需要执行某些操作，例如显示错误消息
                                                   alert("pas trouve")
                                               }
                                           })
                                           .catch(error => console.error('Error:', error));
                          
                                   },2000);




                               }else if(btnchercher.innerHTML === "off") {
                                   console.log("btnchercher = off")
                                   clearInterval(arret);
                                   let total_debut = foundPrise.total_debut;
                                   let total = foundPrise.total;
          
                                   if (total > total_debut) {


                                       console.log("consommation total :" , total)
                                       console.log("consommation total_debut :" , total_debut)
                                       console.log("consommation valueCredit :" , valueCredit)
                                      
                                       console.log("consommation total est plus grand")
                                       let credit_total = consommation(total_debut, total, valueCredit);
                                       console.log(credit_total)


                                       const requestOptions = {
                                           method: 'PATCH',
                                           headers: {
                                               'Content-Type': 'application/json'
                                           },
                                           body: JSON.stringify({ userUID: userUID, credit: credit_total })
                                       };
                      
                                       // Send PATCH request
                                       fetch(`http://192.168.5.172:3000/users/${userUID}`, requestOptions)
                                           .then(response => {
                                               if (!response.ok) {
                                                   throw new Error('Network response was not ok');
                                               }
                                               return response.json();
                                           })
                                           .then(data => {
                                               console.log('PATCH request successful:', data);
                                               // Handle successful response here (e.g., update UI)
              
                                               location.reload();
                                           })
                                           .catch(error => {
                                               console.error('Error:', error);
                                               // Handle errors (e.g., display error message to user)
                                               alert('An error occurred while processing the request. Please try again later.');
                                           });
              




                      
                                   } else if (total === total_debut) {          
                                       console.log("consommation total ==")


                                   } else {
                                       console.log("error")
                                   }
                  


                               }


                           } else {
                               console.log("Not found");
                               // 如果未找到，可能需要执行某些操作，例如显示错误消息
                               alert("pas trouve")
                           }
                       })
                       .catch(error => console.error('Error:', error));




               }




               function btn(total, id) { 
                   if (btn0.style.display === 'block') {
                       // btn0 is visible, hide it and show btn1
                      
                       nomchercherInput.disabled = true;
                       btnchercher.innerHTML = "on";


                       btn0.style.display = 'none';
                       btn1.style.display = 'block';
                       // 使用 client 变量进行 MQTT 消息发布
                       sendCommand('on');


                   } else {


                       nomchercherInput.disabled = false;


                       btnchercher.innerHTML = "off";


                       // btn0 is not visible, show it and hide btn1
                       btn0.style.display = 'block';
                       btn1.style.display = 'none';
                       // 使用 client 变量进行 MQTT 消息发布
                       sendCommand('off');


                       // console.log("etat = ",etat)
                       // console.log(total)
                       // console.log(id)


                       const total_debut = total;
                       // console.log("total_debut:",total_debut)


                       // Construct PATCH request
                       const requesTotal_debut = {
                           method: 'PATCH',
                           headers: {
                               'Content-Type': 'application/json'
                           },
                           body: JSON.stringify({ total_debut: total_debut })
                       };




                       fetch(`http://192.168.5.172:3000/prise/${id}`, requesTotal_debut)
                           .then(response => {
                               if (!response.ok) {
                                   throw new Error('Network response was not ok');
                               }
                               return response.json();
                           })
                           .then(data => {
                               console.log('PATCH request successful:', data);
                               // Handle successful response here (e.g., update UI)
                           })
                           .catch(error => {
                               console.error('Error:', error);
                               // Handle errors (e.g., display error message to user)
                               alert('An error occurred while processing the request. Please try again later.');
                           });




                   }


               }
  
  
               function sendCommand(action) {
                   // 从某个地方获取或设置设备的 ID
                   fetch('http://192.168.5.172:3000/switch', {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json'
                       },
                       body: JSON.stringify({ action: action, id: id })
                   })
                   .then(response => response.json())
                   .then(data => console.log(data))
                   .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));
               }




               /****************************credit*********************************************************/


               function consommation(total_debut, total, credit){
                   let consommationCredit = total - total_debut;
                   console.log("consommationCredit :" , consommationCredit)
                   console.log("credit :" , credit)
                   console.log(`consommationCredit : ${ total} - ${total_debut} = ${consommationCredit}`)
              
                   credit_total = credit - consommationCredit;
              
                   // console.log("total Credit :" , credit_total)
                   console.log(`credit_total : ${credit} - ${consommationCredit} = ${credit_total}`)


                   document.getElementById("credit").textContent = credit_total.toFixed(3);


                   return credit_total;
               }
              


           }
















           /****************************Paypal(recharger)*********************************************************/


           const amountElement = document.getElementById("amount"); // Déclarer la variable en dehors du gestionnaire d'événements




           function modifierTotal() {
               const euros = document.getElementById("euros");
               let inputValue = parseFloat(amountElement.value);
               if (!isNaN(inputValue)) {
                   let total = inputValue * 0.2516;
                   euros.textContent = total.toFixed(2);
               } else {
                   euros.textContent = "0.00"; // 或者显示其他默认值
               }
           }
          
           amountElement.addEventListener("input", modifierTotal);




           document.querySelector("#recharger").addEventListener('click', function() {
              
               /********************modal*******************/
               const modal = document.getElementById("rechargerModal"); // Récupérer l'élément modal


               modal.style.display = "block"; // Afficher le modal lorsque l'élément est cliqué


               window.onclick = function(event) {
                   if (event.target == modal) {
                       modal.style.display = "none";


                       amountElement.value = "";
                       modifierTotal(); // 在模态框关闭时更新总金额
                   }
               }




           });




           paypal.Buttons({
               createOrder: function (data, actions) {
                   return actions.order.create({
                       purchase_units: [
                           {
                               amount: {
                                   value: (amountElement.value * 0.2516).toFixed(2),
                               },
                           },
                       ],
                   });
               },
               onApprove: function (data, actions) {
                   return actions.order.capture().then(function (details) {
                       // Check if payment is successful
                       if (details.status === 'COMPLETED') {
                           let credit_total = parseFloat(valueCredit) + parseFloat(amountElement.value);
          
                           // Construct PATCH request
                           const requestOptions = {
                               method: 'PATCH',
                               headers: {
                                   'Content-Type': 'application/json'
                               },
                               body: JSON.stringify({ userUID: userUID, credit: credit_total })
                           };
          
                           // Send PATCH request
                           fetch(`http://192.168.5.172:3000/users/${userUID}`, requestOptions)
                               .then(response => {
                                   if (!response.ok) {
                                       throw new Error('Network response was not ok');
                                   }
                                   return response.json();
                               })
                               .then(data => {
                                   console.log('PATCH request successful:', data);
                                   // Handle successful response here (e.g., update UI)


                                   amountElement.value = "";
                                   modifierTotal();
                                  
                                   location.reload();
                                  
                               })
                               .catch(error => {
                                   console.error('Error:', error);
                                   // Handle errors (e.g., display error message to user)
                                   alert('An error occurred while processing the request. Please try again later.');
                               });
                              
                       } else {
                           console.error('Payment not completed');
                           // Handle payment not completed (e.g., display error message to user)
                           alert('Payment not completed. Please try again later.');
                       }
                   });
               },
           })
           .render("#paypal");
          


          
       } else {
           console.log("Utilisateur non trouvé");
           // 如果未找到，可能需要执行某些操作，例如显示错误消息
       }
   })
   .catch(error => console.error('Erreur :', error));









