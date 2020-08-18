import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../utils/logout";
import { LOGOUT } from "../store/types";
import { connect } from "react-redux";

class NavBar extends Component {
  handleLogout = () => {
    logout();
    this.props.logout();
  };
  render() {
    return (
      <>
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/admin" className="brand-logo ml-2">
              Logo
            </NavLink>
            <NavLink
              to="/admin"
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </NavLink>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/admin">Sass</NavLink>
              </li>
              <li>
                <NavLink to="/admin">Components</NavLink>
              </li>
              <li>
                <NavLink to="/admin">Javascript</NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={this.handleLogout}>
                  Log out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: LOGOUT }),
});

export default connect(null, mapDispatchToProps)(NavBar);
