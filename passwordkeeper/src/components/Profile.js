import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button } from 'react-bootstrap';
 
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      account: [],
      username: [],
      password: [],
      users: ''
    }
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

  readUserData() {
    /* fire.database().ref('/users/' + userID).once('value')
    .then(function (snapshot) {
        console.log(snapshot.val())
    }); */
    const rootRef = fire.database().ref();
    const user = rootRef.child('users/I7SN4L1ibiPYbnkiOFKlMgclmu53')

    user.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          account: this.state.account.concat([child.key]),
          username: this.state.username.concat([child.val().username]),
          password: this.state.password.concat([child.val().password])
        });

        console.log(child.key + '' + child.val().username + '' + child.val().passowrd)

        const userList = this.state.account.map((dataList, index) =>
                <p>
                    {dataList}
                    <br />
                    {this.state.username[index]}
                    <br />
                    {this.state.password[index]}
                    <hr />
                </p>

            );

            this.setState({
                users: userList
            });

      })
    })

  }

  deleteData(){
    fire.database().ref('users/').remove();
  }

  updateSingleData(email){
    fire.database().ref('users/').update({
        email,
    });
  }

  writeUserData(userID, acc, us, pwd){
    /* fire.database().ref('users/' + userID).set({
      account: acc,
      password: pwd
    }); */
    fire.database().ref('users/' + userID +'/'+ acc).set({
      username: us,
      password: pwd
    });

    console.log('database scritto')
  }

  aggiungiDati(event) {
    event.preventDefault()  //quando si clicca non cambia pagina e la ricarica
    
    const accountNuovo = this.accountInput.value
    const usernameNuovo = this.accountInput.value
    const passwordNuovo = this.passwordInput.value

    this.loginForm.reset();

    this.writeUserData(this.props.userID, accountNuovo, usernameNuovo, passwordNuovo)

  }

  componentDidMount() {
    this.writeUserData(this.props.userID, 'twitter', 'abc', 'pwd')
    this.readUserData()
  }

  render() {
    return (
     <div className="welcomeText">
         <h1>Pagina personale di {this.props.name}</h1>
         
         <Button variant="dark" data-toggle="collapse" data-target="#nuovoAccountStyle">Aggiungi nuovo</Button>
        <div className="nuovoAccountStyle">
          <Form onSubmit={(event) => { this.aggiungiDati(event) }} ref={(form) => { this.accountForm = form }}>
          <Form.Group controlId="formBasicInput">
              <Form.Label>Account</Form.Label>
              <Form.Control type="text" placeholder="Enter account" ref={(input) => { this.accountInput = input }}/>
              <Form.Text className="text-muted">
                Ex: Facebook, Twitter..
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicInput">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" ref={(input) => { this.usernameInput = input }}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={(input) => { this.passwordInput = input }}/>
            </Form.Group>
            <Button variant="dark" type="submit">
              Aggiungi
            </Button>
          </Form>

        </div>

        
        <div>
          <p>Account salvati:</p>

          <ul>{this.state.users}</ul>       
  
          {/* <input type="password" id="pwd" placeholder="Password"></input> */}
        </div>
     </div>
    );
  }
}

export default Profile;
