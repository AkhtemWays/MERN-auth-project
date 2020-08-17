import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login";
import Home from "../src/components/Home";
import { connect } from "react-redux";

class Routes extends Component {
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

export default connect(mapStateToProps, null)(Routes);
