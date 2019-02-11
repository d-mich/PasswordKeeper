import React, { Component } from 'react';
import Styles from './Style.css';

class Welcome extends Component {

  render() {
    return (
     <div className="welcomeText">
         <h1>Benvenuto in Password Keeper</h1>
         <br></br>
         <p>
             Puoi salvare le password dei tuoi account in maniera sicura.
             <br></br>
             Dovrai ricordarne solo una, quella di accesso.
         </p>

     </div>
    );
  }
}

export default Welcome;
