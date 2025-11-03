  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAM6z8ty656BidjK3XwucTrkYeD-ygQAG4",
    authDomain: "lineagelist-92fe6.firebaseapp.com",
    databaseURL: "https://lineagelist-92fe6-default-rtdb.firebaseio.com",
    projectId: "lineagelist-92fe6",
    storageBucket: "lineagelist-92fe6.firebasestorage.app",
    messagingSenderId: "404525529371",
    appId: "1:404525529371:web:49323df5ee817f6fce7bbe",
    measurementId: "G-521TV42GMF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  export { db };