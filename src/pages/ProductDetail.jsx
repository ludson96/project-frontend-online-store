import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';

export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      produto: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const produto = await getProductsFromId(id);
    console.log(produto);
    this.setState({ produto });
  }

  goToShoppingCart = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  }

  render() {
    const { produto } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{produto.title}</h2>
        <img
          src={ produto.thumbnail }
          alt={ `Imagem de ${produto.title}` }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          {`R$ ${produto.price},00`}
        </p>
        <button
          to="/shopping-cart"
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.goToShoppingCart }
        >
          Salvar

        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.string.isRequired,
};
