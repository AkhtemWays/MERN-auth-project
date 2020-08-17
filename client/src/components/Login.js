import React, { Component } from "react";
import { authorize, register } from "../store/actions";
import { connect } from "react-redux";

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
    const data = await this.props.authorize("/api/auth/login", {
      ...this.state,
    });
    if (!data.errors) {
      window.alert(data.message);
    } else {
      window.alert(data.errors);
      return;
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
          <h6>Авторизация</h6>

          <div className="input-field col s6">
            <input
              id="email"
              type="email"
              className="validate"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
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
            />
          </div>
          <div>
            <button
              className="btn btn-primary btn-sm m-3"
              onClick={this.handleLogin}
            >
              Войти
            </button>
            <button
              className="btn btn-primary btn-sm m-3"
              onClick={this.registerHandler}
            >
              Зарегистрироваться
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
