import React, { Component } from 'react';
import Header from '../components/Header';

export default class ShoppingCart extends Component {
  state = {
    cartList: [],
    // quantityItem: 1,
    quantityTotal: 0,
  }

  componentDidMount = () => {
    // const { cartList } = this.state;
    const local = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cartList: local });
    console.log(local);
    this.quantTotalUpdate();
  }

  quantityTotal = (bool) => {
    if (bool) {
      this.setState((prev) => ({ quantityTotal: prev.quantityTotal + 1 }));
    }
    if (!bool) {
      this.setState((prev) => ({ quantityTotal: prev.quantityTotal - 1 }));
    }
  }

  quantTotalUpdate = () => {
    const local = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(local);
    let quantityTotal = 0;
    local.forEach((item) => {
      quantityTotal += item.quant;
    });
    this.setState({ quantityTotal });
  }

  increaseQuant = (id, max, itemQuant) => {
    const { cartList } = this.state;
    if (itemQuant < max && cartList.length > 0) {
      const local = JSON.parse(localStorage.getItem('cart'));
      if (id) {
        const newItem = [];
        local.forEach((item) => {
          if (item.id === id) { item.quant += 1; }
          newItem.push(item);
        });
        localStorage.setItem('cart', JSON.stringify(newItem));
        const newList = JSON.parse(localStorage.getItem('cart'));
        this.setState({ cartList: newList });
      }
    }

    this.quantTotalUpdate();
  }

  decreaseQuant = (id, quant) => {
    const { cartList } = this.state;
    if (quant > 1 && cartList.length > 0) {
      const local = JSON.parse(localStorage.getItem('cart'));
      if (id) {
        const newItem = [];
        local.forEach((item) => {
          if (item.id === id) { item.quant -= 1; }
          newItem.push(item);
        });
        localStorage.setItem('cart', JSON.stringify(newItem));
        const newList = JSON.parse(localStorage.getItem('cart'));
        this.setState({ cartList: newList });
      }
    }
    this.quantTotalUpdate();
  }

  removItemId = (idItem) => {
    const { cartList } = this.state;
    if (cartList.length > 0) {
      const local = JSON.parse(localStorage.getItem('cart'));
      const filter = local.filter(({ id }) => id !== idItem);
      localStorage.setItem('cart', JSON.stringify(filter));
      this.setState({ cartList: filter });
      this.quantTotalUpdate();
    }
  }

  render() {
    const { cartList, quantityTotal } = this.state;
    return (
      <div>
        <div className="header-box">
          <Header />
        </div>
        <div>
          <h1 className="cart-page-name">Carrinho</h1>
          <p className="quant-total">
            {quantityTotal}
            {' '}
            Produto(s) no carrinho
          </p>

          { cartList.length === 0
            ? (
              <p className="empty-cart" data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </p>
            )
            : cartList.map((item) => (
              <li className="cart-item" key={ item.id }>
                <h3
                  className="cart-item-title"
                  data-testid="shopping-cart-product-name"
                >
                  { item.title }

                </h3>
                <img src={ item.thumbnail } alt={ item.title } />
                <p>
                  R$
                  { item.price }
                </p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuant(item.id, item.quant) }
                >
                  -
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  { item.quant }
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={
                    () => this.increaseQuant(item.id, item.availableQuant, item.quant)
                  }
                >
                  +
                </button>
                <button
                  data-testid="remove-product"
                  type="button"
                  onClick={ () => this.removItemId(item.id) }
                >
                  Remover

                </button>
              </li>
            ))}
        </div>
      </div>
    );
  }
}
