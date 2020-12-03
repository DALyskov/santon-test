import React from "react";
import "./product-btn.scss";

import { ProductBtnClassNames } from "../../const.js"

export class ProductBtn extends React.Component {
  render() {
    const { className, onBtnClick } = this.props;
    const btnClassName = `product-btn ${className}`
    const title = className === ProductBtnClassNames.NEW ? `Добавить товар` : `Удалить/Закрыть`

    return (
        <button
          className={btnClassName}
          type="button"
          onClick={(evt) => {
            evt.preventDefault();
            onBtnClick();
        }}>
          <span className="visually-hidden">{title}</span>
        </button>
    );
  }
}
