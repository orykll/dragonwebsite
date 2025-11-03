/*import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";*/
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyAM6z8ty656BidjK3XwucTrkYeD-ygQAG4",
  authDomain: "lineagelist-92fe6.firebaseapp.com",
  databaseURL: "https://lineagelist-92fe6-default-rtdb.firebaseio.com",
  projectId: "lineagelist-92fe6",
  storageBucket: "lineagelist-92fe6.firebasestorage.app",
  messagingSenderId: "404525529371",
  appId: "1:404525529371:web:49323df5ee817f6fce7bbe",
  measurementId: "G-521TV42GMF"
};*/

//refer msgs collection

// 1. Import the db instance from the module script block in your HTML
// Import the 'db' instance from your config file
import { db } from './firebase-config.js';

// Import the Firestore functions we need
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Get a reference to the form
const form = document.getElementById('surveyForm');
const outputDiv = document.querySelector('.output');

// Listen for the form's submit event
form.addEventListener('submit', async (e) => {
  // Prevent the form from actually submitting (which reloads the page)
  e.preventDefault();

  // Show feedback to the user
  outputDiv.textContent = 'Submitting...';

  try {
    // 1. Get all the values from the form
    const lairLink = document.getElementById('username').value;
    
    // Create an object with all the checkbox values
    const interests = {
      Dya: document.getElementById('interestedDya').checked,
      G2_Imperials: document.getElementById('interestedImp').checked,
      Firuxe: document.getElementById('interestedFir').checked,
      Ausra: document.getElementById('interestedAus').checked,
      Zinovia: document.getElementById('interestedZin').checked,
      Elysian: document.getElementById('interestedEly').checked,
      Seraph: document.getElementById('interestedSer').checked,
      Staff_Descendants: document.getElementById('interestedStf').checked,
      Roundsey_Purebreds: document.getElementById('interestedRnd').checked,
      Naomi: document.getElementById('interestedNao').checked,
      Ignis: document.getElementById('interestedIgn').checked,
      Luck: document.getElementById('interestedLck').checked
    };

    // 2. Create the data object to save
    const submissionData = {
      lairLink: lairLink,
      interests: interests,
      submittedAt: new Date() // Good practice to add a timestamp
    };

    // 3. Add a new document to a collection named "submissions"
    const docRef = await addDoc(collection(db, "submissions"), submissionData);

    // 4. Give the user success feedback
    console.log("Document written with ID: ", docRef.id);
    outputDiv.textContent = 'Thank you! Your submission was successful.';
    form.reset(); // Clear the form

  } catch (error) {
    // 5. Handle errors
    console.error("Error adding document: ", error);
    outputDiv.textContent = 'Error: Could not submit form. Please try again.';
  }
});

/*var messagesRef = firebaseConfig.database().ref('users');

document.getElementById('surveyForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
//getb
    var username = getInputVal('username');
    var dya = getInputVal('interestedDya');
    var imp = getInputVal('interestedImp');
    var fir = getInputVal('interestedFir');
    var aus = getInputVal('interestedAus');
    var zin = getInputVal('interestedZin');
    var ely = getInputVal('interestedEly');
    var ser = getInputVal('interestedSer');
    var stf = getInputVal('interestedStf');
    var rnd = getInputVal('interestedRnd');
    var nao = getInputVal('interestedNao');
    var ign = getInputVal('interestedIgn');
    var lck = getInputVal('interestedLck');
//savemsg
    saveMessage(username, dya, imp, fir, aus, zin, ely, ser, stf, rnd, nao, ign, lck);
  }
// function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}
//
function saveMessage(username, dya, imp, fir, aus, zin, ely, ser, stf, rnd, nao, ign, lck){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    username: username,
    dya: dya,
    imp: imp,
    fir: fir,
    aus: aus,
    zin:zin,
    ely:ely,
    ser:ser,
    stf:stf,
    rnd:rnd,
    nao:nao,
    ign:ign,
    lck:lck
  });

}

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  /*const firebaseConfig = {
    apiKey: "AIzaSyAM6z8ty656BidjK3XwucTrkYeD-ygQAG4",
    authDomain: "lineagelist-92fe6.firebaseapp.com",
    databaseURL: "https://lineagelist-92fe6-default-rtdb.firebaseio.com",
    projectId: "lineagelist-92fe6",
    storageBucket: "lineagelist-92fe6.firebasestorage.app",
    messagingSenderId: "404525529371",
    appId: "1:404525529371:web:49323df5ee817f6fce7bbe",
    measurementId: "G-521TV42GMF"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  async function submitSurvey(username, interest) {
  await db.collection("surveys").add({
    username: username,
    interest: interest,
    timestamp: new Date()
  });
  alert("Survey submitted!");
}

/*
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  //firebaseConfig.initializeApp(firebaseConfig);

 /* var lineageList = firebaseConfig.database().ref('lineagelist')

  

  

    console.log(123);

    var username = getInputVal('username');
    var dya = getInputVal('interestedDya');
    var imp = getInputVal('interestedImp');
    var fir = getInputVal('interestedFir');
    var aus = getInputVal('interestedAus');
    var zin = getInputVal('interestedZin');
    var ely = getInputVal('interestedEly');
    var ser = getInputVal('interestedSer');
    var stf = getInputVal('interestedStf');
    var rnd = getInputVal('interestedRnd');
    var nao = getInputVal('interestedNao');
    var ign = getInputVal('interestedIgn');
    var lck = getInputVal('interestedLck');

    var username = getInputValue('username');
    var dya = getElementValue('interestedDya');
    var imp = getElementValue('interestedImp');
    var fir = getElementValue('interestedFir');
    var aus = getElementValue('interestedAus');
    var zin = getElementValue('interestedZin');
    var ely = getElementValue('interestedEly');
    var ser = getElementValue('interestedSer');
    var stf = getElementValue('interestedStf');
    var rnd = getElementValue('interestedRnd');
    var nao = getElementValue('interestedNao');
    var ign = getElementValue('interestedIgn');
    var lck = getElementValue('interestedLck');

    console.log(username, dya, imp, fir, aus, zin, ely, ser, stf, rnd, nao, ign, lck);
  }

  const getElementValue = (id) => {
    return document.getElementById(id).value; 
  }
  
  // Initialize Firebase

/*
document.getElementById("surveyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const interests = [];

    document.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      if (box.checked) interests.push(box.id.replace("interested", ""));
    });

    if (!username) return alert("Please enter a username.");

    await db.collection("surveys").add({
      username: username,
      interests: interests,
      timestamp: new Date()
    });

    alert("Survey submitted successfully.");
  });
  */