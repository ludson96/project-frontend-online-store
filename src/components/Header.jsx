import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Frontend Online Store</h1>
        <nav className="header-nav">
          <Link to="/">Pesquisar</Link>
          <Link
            // data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            Carrinho de compras
          </Link>
        </nav>
      </div>
    );
  }
}
