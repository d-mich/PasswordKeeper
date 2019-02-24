import React from 'react';
// eslint-disable-next-line
import Styles from './Style.css';

function Welcome (){
    return (
     <div className="welcomeText">
         <h3>Benvenuto in <br/>
         Password Keeper</h3>
         <br></br>
         <p>
             Puoi salvare le password dei tuoi account in maniera sicura.
             <br></br>
             Dovrai ricordarne solo una, quella di accesso.
         </p>
     </div>
    );
}

export default Welcome;
