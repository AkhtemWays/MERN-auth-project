import React, { Component } from "react";

export default class Login extends Component {
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
  handleLogin = async (ev) => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...this.state }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log("Невышло взять данные ", e.message);
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
            <button className="btn btn-primary btn-sm m-3">
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    );
  }
}
