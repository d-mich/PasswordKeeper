import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
    return (
      <div>
        {this.state.redirect
          ? <Redirect to="/" />
          : null
        }
      </div>
    )
  }
}

export default Logout