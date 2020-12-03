import React from "react";
import "./product-form.scss";

import { ProductBtn } from "../productBtn";
import { ProductBtnClassNames } from "../../const.js"

export class ProductForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ``,
      price: ``,
      description: ``
    }

    this._handleEscPress = this._handleEscPress.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleEscPress);
  }

  componentWillUnmount() {
  document.removeEventListener("keydown", this._handleEscPress);
  }

  _handleInputChange(evt) {
    const target = evt.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }

  _handleEscPress(evt) {
    if (evt.keyCode === 27) {
      this.props.changePopupStatus()
    }
  }

  render() {
    const { changePopupStatus, onFormSubmit } = this.props;
    const { title, price, description } = this.state;

    return (
      <div className="product-popup">

        <form
          className="product-form"
          onSubmit={(evt) => {
            evt.preventDefault();
            onFormSubmit(this.state)
          }}>
        <div className="product-popup-btn">
        <ProductBtn
          className={ProductBtnClassNames.DELETE}
          onBtnClick={changePopupStatus}
        />
        </div>
          <label className="product-form-field">
            <span className="product-form-name">Название:</span>
            <input
              className="product-form-data"
              type="text"
              name="title"
              placeholder="Королева"
              required
              value={title}
              onChange={this._handleInputChange}

            />
          </label>
          <label className="product-form-field">
            <span className="product-form-name">Цена:</span>
            <input
              className="product-form-data"
              type="number"
              name="price"
              placeholder="1"
              required
              value={price}
              onChange={this._handleInputChange}
            />
          </label>
          <fieldset className="product-form-field">
            <label className="product-form-subtitle" >Описание:</label>
            <textarea
              className="product-form-data product-form-data--comment"
              name="description"
              rows="10"
              placeholder="Опишите игрушку"
              required
              value={description}
              onChange={this._handleInputChange}
            />
          </fieldset>
          <button className="product-form-btn" type="submit">Добавить</button>
        </form>
      </div>
    );
  }
}
