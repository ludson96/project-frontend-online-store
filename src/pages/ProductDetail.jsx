import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromId } from '../services/api';
import addItemLocalStorage from '../services/ItemCart';
import Header from '../components/Header';

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
    this.setState({ produto });
  }

  addToShoppingCart = () => {
    const { produto: { id, title, thumbnail, price } } = this.state;
    addItemLocalStorage(id, title, thumbnail, price);
  }

  render() {
    const { produto } = this.state;
    return (
      <div>
        <Header />
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
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToShoppingCart }
          >
            Salvar

          </button>
        </div>
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
};
