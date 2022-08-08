import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    cartList: [],
  }

  componentDidMount = () => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    if (cartList !== null) {
      this.setState({ cartList });
    }
  }

  render() {
    const { cartList } = this.state;
    return (
      <div>
        { cartList.length === 0
          ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
          : cartList.map((item) => (
            <li key={ item.id }>
              <h3 data-testid="shopping-cart-product-name">{ item.title }</h3>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{ item.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ item.quant }</p>
            </li>
          ))}
      </div>
    );
  }
}
