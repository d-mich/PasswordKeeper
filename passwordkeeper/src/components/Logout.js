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
  }

  render() {
      //redirect true
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    //redirect default
    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <RingLoader />
      </div>
    )
  }
}

export default Logout