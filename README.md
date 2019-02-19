PASSWORD KEEPER
Progetto di Programmazione di Applicazioni Web e Mobile - UNICAM
REALIZZATO DA:
- Andrea Falaschini - andrea.falaschini@studenti.unicam.it
- Diego Miccio - diego.miccio@studenti.unicam.it
- Matteo Guerrini - matteo.guerrini@studenti.unicam.it
Il progetto consiste nella realizzazione di una PWA inerente alla gestione delle password in modo
sicuro di un generico utente.
USER STORIES (utente):
- poter accedere ad un’area privata tramite username e password.
- poter creare un account tramite email, o accesso diretto con Facebook o Google.
- poter cancellare il mio account in qualsiasi momento.
- avere informazioni su come utilizzare l’applicazione.
- poter effettuare il logout dall’area privata.
- poter aggiungere, salvare e modificare password.
- avere la garanzia che le password siano memorizzate e gestite in maniera sicura (https e
passwordEncryption).
TECNOLOGIE UTILIZZATE E RELATIVE INSTALLAZIONI
➢ Node.js
Scaricare dal seguente link l’installer per Windows/Mac (https://nodejs.org/it/).
➢ ReactJS
Scaricare i componenti necessari tramite npm.
Per istruzioni vedere : (https://reactjs.org/docs/create-a-new-react-app.html)
➢ Firebase
In questo sito https://firebase.google.com/ è possibile accedere ad un servizio di hosting personale su
piattaforma Google.
Utilizziamo questa tecnologia per gestire : dati (database NoSQL), connessione su protocollo HTTPS e
autenticazione degli utenti.
UTILIZZO IN LOCALE
1. Clonare la repository e aprire la cartella contenente il progetto.
2. Aprire un terminale come admin e posizionarsi nel percorso della cartella del progetto.
3. Eseguire il comando “npm install” per scaricare tutti i moduli necessari al funzionamento
dell’applicazione.
4. Eseguire “npm start” per visualizzare l’app in locale all’indirizzo http://localhost/3000.
UTILIZZO SU FIREBASE
1. Installare firebase tramite il comando “npm install firebase --save”.
2. Effettuare il login su firebase tramite il comando “firebase login”.
3. Buildare applicazione e deployarla su firebase eseguendo i comandi “npm run build” e
“firebase deploy”.
4. Collegarsi all’url fornito nel terminale una volta eseguiti i comandi.
LINK
Sito PWA : https://passwordkeeper-f658d.firebaseapp.com/