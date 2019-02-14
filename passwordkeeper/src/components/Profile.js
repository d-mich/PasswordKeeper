import React, { Component } from 'react';
import { fire } from '../config/Fire';
 
class Profile extends Component {
  constructor() {
    super();
  }

  writeUserData(userID, email,fname,lname){
    fire.database().ref('users/' + userID).set({
        email,
        fname,
        lname
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

  readUserData(userID) {
    fire.database().ref('/users/' + userID).once('value')
    .then(function (snapshot) {
        console.log(snapshot.val())
    });
  }

  deleteData(){
    fire.database().ref('users/').remove();
  }

  updateSingleData(email){
    fire.database().ref('users/').update({
        email,
    });
  }

  render() {
    return (
     <div className="welcomeText">
         <h1>Pagina personale di {this.props.name}</h1>
         <p>ID: {this.props.userID}</p>
         
        <p>Account salvati:</p>
        <div>        
  
          <input type="password" id="pwd" placeholder="Password"></input>
        </div>
     </div>
    );
  }
}

export default Profile;
