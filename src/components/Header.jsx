import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header-box">
        <h1 className="header-title">Frontend Online Store</h1>
        <nav className="header-nav">
          <Link to="/">Início</Link>
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            Carrinho de compras
          </Link>
        </nav>
      </div>
    );
  }
}
