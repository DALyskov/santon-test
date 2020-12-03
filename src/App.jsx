import React from "react";
import "./state/stores/ProductsStore";
import "./state/stores/UsersStore";
import './index.scss';

import LoginForm from "./components/loginForm";
import ProductList from "./components/productList";

export class App extends React.Component {
  render() {
    return (
      <main>
        <h1>Frontend Test Task</h1>
        <LoginForm />
        <ProductList changePopupStatus={this.handleChangePopupStatus}/>
      </main>
    );
  }
}
