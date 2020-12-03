import React from "react";
import "./product-list.scss";

import { ProductBtnClassNames } from "../../const.js"
import { getRndNumber } from "../../utils";

import { withStore } from "../../state/withStore";
import { Product } from "../product";
import { ProductBtn } from "../productBtn";
import { ADD_PRODUCT, REMOVE_PRODUCT  } from "../../state/stores/ProductsStore"
import { ProductForm } from "../productForm";


class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpenPopup: false
    }

    this.handleChangePopupStatus = this.handleChangePopupStatus.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  handleChangePopupStatus() {
    this.setState((prevState) => ({isOpenPopup: !prevState.isOpenPopup}))
  }

  handleRemoveProduct(id) {
    this.props.dispatch(REMOVE_PRODUCT, {id})
  }

  handleAddProduct(newProduct) {
    const newId = getRndNumber(0, 99999);
    newProduct.price = Number(newProduct.price);
    const product = {...newProduct, id: newId}

    this.props.dispatch(ADD_PRODUCT, {product});
    this.handleChangePopupStatus();
  }

  render() {
    const { products } = this.props;
    const { isOpenPopup } = this.state;

    return (
      <div className="product-list">
        <ProductBtn
          className={ProductBtnClassNames.NEW}
          onBtnClick={this.handleChangePopupStatus}
        />

        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onDeleteBtnClick={this.handleRemoveProduct}
          />
        ))}

        {isOpenPopup &&  <ProductForm
          changePopupStatus={this.handleChangePopupStatus}
          onFormSubmit={this.handleAddProduct}
        />}
      </div>
    );
  }
}

export default withStore("products", (data) => data)(ProductList);
