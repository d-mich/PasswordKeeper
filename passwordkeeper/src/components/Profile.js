import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="welcomeText">
         <h1>Pagina personale utente</h1>
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

export default Profile;
