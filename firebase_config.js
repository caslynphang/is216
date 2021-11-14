var firebaseConfig = {
    apiKey: "AIzaSyBzoF4pZdn_TG8sAzJ_RIsGA2TEOPcj1lg",
    authDomain: "mysmugame.firebaseapp.com",
    projectId: "mysmugame",
    storageBucket: "mysmugame.appspot.com",
    messagingSenderId: "353469447992",
    appId: "1:353469447992:web:3ba788284f8dc137de0bcd"
    };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// FEEDBACK
function send() {
  var emailaddress = document.getElementById('emailaddress').value;
  console.log(emailaddress);
  var message = document.getElementById("message").value;

  db.collection("review").doc().set({
    email: emailaddress,
    message: message
  })
    .then(() => {
      console.log("Document successfully written!");
      window.location.href = "game.html";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

}
