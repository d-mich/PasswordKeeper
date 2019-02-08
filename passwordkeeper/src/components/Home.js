import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../config/Fire';

class Home extends Component {

    constructor(props) {
        super(props)
        this.closePopover = this.closePopover.bind(this)
        this.state = {
          popoverOpen: false
        }
      }
    
    closePopover() {
      this.setState({ popoverOpen: false })
    }

    render() {
        return (
          <nav className="pt-navbar">
            <div className="pt-navbar-group pt-align-left">
              <div className="pt-navbar-heading">Password Keeper</div>
              {this.props.authenticated
              /* SE AUTENTICATO RITORNA: */
              ? <input className="pt-input" placeholder="Cerca account" type="text" />
              /* ALTRIMENTI RITORNA: */
              : null
          }
            </div>
            {
              this.props.authenticated
              /* SE AUTENTICATO RITORNA: */
              ? (
                <div className="pt-navbar-group pt-align-right">
                  <Link className="pt-button pt-minimal pt-icon-cog" to="/accounts">Vedi account con password</Link>
                  {/* <Popover
                    content={(<NewSongForm addSong={this.props.addSong} postSubmitHandler={this.closePopover} />)}
                    interactionKind={PopoverInteractionKind.CLICK}
                    isOpen={this.state.popoverOpen}
                    onInteraction={(state) => this.setState({ popoverOpen: state })}
                    position={Position.BOTTOM}>
                    <button className="pt-button pt-minimal pt-icon-add" aria-label="add new song"></button>
                  </Popover> */}
                  <span className="pt-navbar-divider"></span>
                  <button className="pt-button pt-minimal pt-icon-user"></button>
                  <button className="pt-button pt-minimal pt-icon-cog"></button>
                  <Link className="pt-button pt-minimal pt-icon-log-out" to="/logout" aria-label="Log out"></Link>
                </div>
              )
              /* ALTRIMENTI RITORNA: */
                : (
                  <div className="pt-navbar-group pt-align-right">
                    <Link className="pt-button pt-intent-primary" to="/login">Register/Log In</Link>
                  </div>
                )
            }
          </nav>
        );
      }
}

export default Home;