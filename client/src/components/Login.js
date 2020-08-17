import React, { Component } from "react";
import { authorize, register } from "../store/actions";
import { connect } from "react-redux";
import { authUser } from "../localStorageNames";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  componentWillUnmount() {
    this.setState({ email: "", password: "" });
  }
  handleLogin = async (ev) => {
    try {
      const data = await this.props.authorize("/api/auth/login", {
        ...this.state,
      });
      if (!data.errors) {
        window.alert(data.message);
        localStorage.setItem(
          authUser,
          JSON.stringify({ token: data.token, userId: data.userId })
        );
      } else {
        window.alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };
  registerHandler = async (ev) => {
    const data = await this.props.register("/api/auth/register", "POST", {
      ...this.state,
    });
    if (!data.errors) {
      window.alert(data.message);
      return;
    } else if (data.errors && typeof data.errors == "object") {
      let msg = "Неверно указаны следующие данные: \n";
      for (let error of data.errors) {
        msg += `${error.param}: ${error.msg}\n`;
      }
      window.alert(msg);
      return;
    } else if (data.errors && typeof data.errors === "string") {
      window.alert(data.errors);
      return;
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <h1
            style={{
              textAlign: "center",
              color: "#E30B5D",
              padding: "1em",
              fontFamily: "cursive",
              fontStyle: "italic",
            }}
          >
            Welcome to anonymous chat!
          </h1>

          <div className="input-field col s6">
            <input
              id="email"
              type="email"
              className="validate"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              placeholder="Enter or register email!"
            />
          </div>
          <div className="input-field col s6">
            <input
              id="password"
              type="password"
              className="validate"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              placeholder="Enter or register password!"
            />
          </div>
          <div align="center">
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.handleLogin}
            >
              Log in
            </button>
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.registerHandler}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
});
const mapDispatchToProps = (dispatch) => ({
  authorize: (url, body) => dispatch(authorize(url, body)),
  register: (url, method, body, headers) =>
    dispatch(register(url, method, body, headers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
