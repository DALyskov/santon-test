import React from "react";
import "./login-form.scss";

import { withStore } from "../../state/withStore";
import { getRndNumber } from "../../utils";

import { ADD_USER, REMOVE_USER } from "../../state/stores/UsersStore"

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ``,
      password: ``,
    }

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleLogoutClick = this._handleLogoutClick.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const newId = getRndNumber(0, 99999);
    const newUser = {id: newId, ...this.state}
    this.props.dispatch(ADD_USER, {user: newUser});
  }

  _handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  _handleLogoutClick(evt) {
    evt.preventDefault();
    this.props.dispatch(REMOVE_USER, {id: this.props.activUser});
    this.setState({
      name: ``,
      password: ``,
    });

  }

  render() {
    const { activUser, users } = this.props;
    const { name, password } = this.state;

    const isLogedIn = activUser !== null ? true : false;
    const user = users.find((elm) => (elm.id === activUser));

    return (
        <form
          className="login-form"
          onSubmit={this._handleSubmit}>

          <label className="login-form-field">
            <span className="login-form-name">Name:</span>
            {isLogedIn ?
              <span className="login-form-name">{user.name}</span> :
              <input
              className="login-form-data"
              type="text"
              name="name"
              placeholder="Dmitry"
              required
              value={name}
              onChange={this._handleInputChange}
              />
            }
          </label>

          {isLogedIn ||
            <label className="login-form-field">
            <span className="login-form-name">Password:</span>
            <input
              className="login-form-data"
              type="text"
              name="password"
              placeholder=" "
              required
              value={password}
              onChange={this._handleInputChange}
            />
            </label>
          }

          {isLogedIn ?
            <button
              className="login-form-btn"
              type="button"
              onClick={this._handleLogoutClick}
            >Log Out</button> :
            <button className="login-form-btn" type="submit">Log In</button>
          }
        </form>
    );
  }
}

export default withStore("users", (data) => data)(LoginForm);
