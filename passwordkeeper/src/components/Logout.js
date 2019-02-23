import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { RingLoader } from 'react-spinners';
import { fire } from '../config/Fire';

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    fire.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    })
    this.deleteStorage()
  }

  deleteStorage() {
    let keysToRemove = ["userID", "userName", "userEmail", "userPicture"];
    keysToRemove.forEach(k => localStorage.removeItem(k))
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h3>Logging Out</h3>
        <RingLoader />
      </div>
    )
  }
}

export default Logout