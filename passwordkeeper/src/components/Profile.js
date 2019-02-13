import React, { Component } from 'react';
import { fire } from '../config/Fire';
 
class Profile extends Component {
  constructor(props) {
    super(props);
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
    console.log('Reading user data')
    this.readUserData('002')
    return (
     <div className="welcomeText">
         <h1>Pagina personale di {this.props.user}</h1>
         

     </div>
    );
  }
}

export default Profile;
