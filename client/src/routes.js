import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login";
import Home from "../src/components/Home";
import { connect } from "react-redux";
import { AUTHORIZE } from "./store/types";
import { authUser } from "./localStorageNames";

class Routes extends Component {
  componentDidMount() {
    console.log("mounting...");
    const data = JSON.parse(localStorage.getItem(authUser));
    if (data && data.token) {
      this.props.authorize();
      localStorage.setItem(
        authUser,
        JSON.stringify({
          token: data.token,
          userId: data.userId,
        })
      );
    }
  }
  render() {
    return (
      <div className="container">
        {!this.props.isAuthorized && (
          <Switch>
            <Route path="/login" component={Login} exact />
            <Redirect to="/login" exact />
          </Switch>
        )}
        {this.props.isAuthorized && (
          <Switch>
            <Route path="/admin">
              <Home />
            </Route>
            <Redirect to="/admin" />
          </Switch>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
});
const mapDispatchToProps = (dispatch) => ({
  authorize: () => dispatch({ type: AUTHORIZE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
