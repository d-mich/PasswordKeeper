import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import './App.css';
import  { fire } from './config/Fire';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Delete from './components/Delete';

class App extends Component {

  constructor() {
    super();
    this.state = {
        authenticated: false,
        loading: true,
        userID: null,
        email: null,
        name: null,
        picture: null
    }
    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.setUserId = this.setUserId.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setName = this.setName.bind(this)
    this.setPicture = this.setPicture.bind(this)
    this.setStateUser = this.setStateUser.bind(this)  
  }

  setLocalUser(id, em, na, pic) {
    localStorage.setItem('userID', id);
    localStorage.setItem('userEmail', em);
    localStorage.setItem('userName', na);
    localStorage.setItem('userPicture', pic);
    /* this.setState({
      userID: localStorage.getItem('userID'),
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      picture: localStorage.getItem('userPicture')
    }) */
    console.log('DATI LOCAL STORAGE:')
    console.log(localStorage.getItem('userID'))
    console.log(localStorage.getItem('userEmail'))
    console.log(localStorage.getItem('userName'))
    console.log(localStorage.getItem('userPicture'))    
  }

  setStateUser() {
    this.setState({
      userID: localStorage.getItem('userID'),
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      picture: localStorage.getItem('userPicture')
    })
  }

  setAuthenticated(param) {
    this.setState({
      authenticated : param
    });
  }

  setUserLocalStorage(currentUser) {
    localStorage.setItem('user', currentUser)
  }
  
  setUserId(param) {
    this.setState({
      userID : param
    });
  }

  setEmail(param) {
    this.setState({
      email : param
    });
  }

  setName(param) {
    this.setState({
      name : param
    });
  }

  setPicture(param) {
    this.setState({
      picture : param
    });
  }

  getPicture() {
    return JSON.parse(JSON.stringify(localStorage.getItem('user.photoURL')))
  }

  componentDidMount() {
    this.setStateUser()
  }

  componentWillMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading : false         
        })
      }else {
        this.setState({
          authenticated: false,
          loading : false             
        })
      }
    })
    this.setStateUser()
  }

/*   componentWillUnmount() {
    this.removeAuthListener();
  } */


  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <RingLoader />
        </div>
      )
    }

    console.log('AUTHENTICATED: '+this.state.authenticated)
    console.log('USER ID: '+this.state.userID)
    console.log('USER NAME: '+this.state.name)
    console.log('USER NAME: '+this.state.picture)

    return (
      <div className="mainStyle">
      <style>{'body { background-color: #515A5A; }'}</style>
        <BrowserRouter>
          <div>
            {/* HEADER passando la variabile authenticated */}
            <Header authenticated={this.state.authenticated}
                    name={this.state.name}
                    picture={this.state.picture}
                    getPicture={this.getPicture}/>  
          <Switch>
            {/* CREO TUTTI I PATH */}

            <Route exact path="/" component={Welcome}/>
      
            <Route exact path="/login" render={(props) => 
                  <Login setAuthenticated={this.setAuthenticated}
                  setUserId={this.setUserId}
                  setEmail={this.setEmail}
                  setUserLocalStorage={this.setUserLocalStorage}
                  setName={this.setName} 
                  setPicture={this.setPicture}
                  setLocalUser={this.setLocalUser}
                  setStateUser={this.setStateUser}
                  {...props}/> //per history.push
                } />
            
            {this.state.authenticated 
            ? <>
                
                <Route exact path="/logout" render={(props) => 
                  <Logout 
                  userID={this.state.userID}
                  {...props}/> //per history.push              
                } />
                
                <Route exact path="/profile" render={(props) => 
                  <Profile 
                  userID={this.state.userID}
                  name={this.state.name}
                  {...props}/> //per history.push              
                } />
                
                <Route exact path="/cancellazione" render={(props) => 
                  <Delete 
                  userID={this.state.userID}
                  name={this.state.name}
                  email={this.state.email}
                  {...props}/> //per history.push              
                } />
               </>         

            : <Redirect to='/login'/> 
            }

            {/* ROUTE NON PRESENTE: ERRORE */}
            <Route component={Error} />

            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
