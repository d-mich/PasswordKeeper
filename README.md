
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

// fire.js
 troviamo le key di firebase, i provider di facebook/google per l'accesso all'applicazione.


//REBASE
importato rebase con npm install react-rebase .
è una libreria firebase che rende semplice l'utilizzo di firebase con i componenti react andando a popolare i dati nel database con lo stato dei componenti.

//login.js
tramite    import { Redirect } from 'react-router-dom';
quando un utente viene autenticato con successo può essere reindirizzato in un'altra route, a seconda della policy del sito.
tramite npm i @blueprintjs/core
installiamo la libreria blueprint per visualizzazione grafica
