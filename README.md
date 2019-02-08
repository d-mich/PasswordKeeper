
// setup
npm install -g  create-react-app
create-react-app passwordKeeper
npm start ( nella root directory del progetto )

// installo firebase
npm install firebase --save
firebase login

// applicazione hostata su firebase
firebase init
(x)Hosting
npm run build
firebase deploy
https://passwordkeeper-f658d.firebaseapp.com/

// su app.js
import firebase from 'firebase';


// sicurezza
abbiamo implementato dei metodi per prevenire il phishing
