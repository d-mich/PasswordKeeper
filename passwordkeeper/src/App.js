import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import  { fire } from './config/Fire';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Delete from './components/Delete';
import Info from './components/Info';

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
    this.setStateUser = this.setStateUser.bind(this)
  }

  setLocalUser(id, em, na, pic) {
    localStorage.setItem('userID', id);
    localStorage.setItem('userEmail', em);
    localStorage.setItem('userName', na);
    localStorage.setItem('userPicture', pic);  
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

  componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading : false         
        })
      } else {
        this.setState({
          authenticated: false,
          loading : false             
        })
      }
    })
    this.setStateUser()
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading">
          Loading
          <RingLoader color={"white"}/>
        </div>
      )
    }

    return (
      <div>
        <header>
          <Header authenticated={this.state.authenticated}
                      name={this.state.name}
                      email={this.state.em}
                      picture={this.state.picture}/>
        </header>
        <div className="mainStyle">
          <body>
            <BrowserRouter>
              <div>              
                <Switch>            
                  <Route exact path="/" component={Welcome}/>

                  <Route path="/login" render={() => 
                        <Login setAuthenticated={this.setAuthenticated}
                        authenticated={this.state.authenticated}
                        setLocalUser={this.setLocalUser}
                        setStateUser={this.setStateUser}/>
                      } />
                
                  {this.state.authenticated 
                  ? <>                
                    <Route path="/logout" render={() => 
                      <Logout 
                      userID={this.state.userID}/>              
                    } />
                    
                    <Route path="/profile" render={() => 
                      <Profile 
                      userID={this.state.userID}
                      email={this.state.email}
                      name={this.state.name}
                      setLocalUser={this.setStateUser}/>              
                    } />
                    
                    <Route path="/cancellazione" render={() => 
                      <Delete 
                      authenticated={this.state.authenticated}
                      userID={this.state.userID}
                      name={this.state.name}
                      email={this.state.email}/>           
                    } />
                    <Route path="/info" component={Info} />                    
                    </>   
                  : <Redirect to='/login'/> 
                  }
                  <Route path="*" component={Error}/>
                </Switch>
              </div>
            </BrowserRouter>
          </body>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
