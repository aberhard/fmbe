// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBDOMFfhqSxqiFK1n-CcgIM95QxW1xyprE",
  authDomain: "fmbe-counter.firebaseapp.com",
  databaseURL: "https://fmbe-counter-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fmbe-counter",
  storageBucket: "fmbe-counter.firebasestorage.app",
  messagingSenderId: "827919854643",
  appId: "1:827919854643:web:4463b083af1e3261820746"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// 1. Datenbank-Dienst mit der initialisierten App aufrufen
const db = getDatabase(app);

// 2. Referenz auf den Pfad des Besucherzählers erstellen
const counterRef = ref(db, 'visitorCount');

// 3. Zähler sicher per Transaktion um 1 erhöhen
/* runTransaction(counterRef, (currentValue) => {
  if (currentValue === null) {
	return 1; // Falls der Zähler noch nicht existiert
  } else {
	return currentValue + 1; // Zähler um 1 erhöhen
  }
}).then(() => {
  console.log("Besucher erfolgreich gezählt!");
}).catch((error) => {
  console.error("Fehler beim Zählen:", error);
}); */

// 4. Zähler erhöhen (nur wenn in dieser Session noch nicht gezählt wurde)
if (!sessionStorage.getItem('hasVisited')) {
  
  runTransaction(counterRef, (currentValue) => {
    if (currentValue === null) {
      return 1;
    } else {
      return currentValue + 1;
    }
  }).then(() => {
    console.log("Besucher erfolgreich gezählt!");
    // Erfolg merken: Ein "Marker" wird im Browser des Besuchers gesetzt
    sessionStorage.setItem('hasVisited', 'true');
  }).catch((error) => {
    console.error("Fehler beim Zählen:", error);
  });

} else {
  console.log("Besucher wurde in dieser Session bereits gezählt. Zähler wird übersprungen.");
}

// Den Zählerstand live auslesen und im HTML anzeigen
  onValue(counterRef, (snapshot) => {
	const data = snapshot.val();
	const displayElement = document.getElementById('visitor-display');
	
	if (data !== null) {
	  displayElement.innerText = data;
	} else {
	  displayElement.innerText = "0";
	}
  });
