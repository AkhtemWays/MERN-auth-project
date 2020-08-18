import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../utils/logout";
import { LOGOUT } from "../store/types";
import { connect } from "react-redux";
import { getAllUsers } from "../store/actions";
import { authUser } from "../localStorageNames";
import { login } from "../utils/login";

class NavBar extends Component {
  handleLogout = (ev) => {
    logout();
    this.props.logout();
  };
  handleLoad = (ev) => {
    ev.preventDefault();
    this.getData();
  };
  async getData() {
    try {
      const localData = JSON.parse(localStorage.getItem(authUser));
      if (localData && localData.token) {
        login(localData);
        await this.props.getAllUsers("/api/users/all", localData.token);
      } else {
        this.handleLogout();
        window.alert("Авторизуйтесь снова");
      }
    } catch (e) {
      console.log(`Client handleLoad failed ${e.message}`);
    }
  }
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
                <NavLink to="/admin" onClick={this.handleLoad}>
                  Load users
                </NavLink>
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
  getAllUsers: (url, token) => dispatch(getAllUsers(url, token)),
});

export default connect(null, mapDispatchToProps)(NavBar);
