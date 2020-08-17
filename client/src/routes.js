import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login";

export default class Routes extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} exact />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
