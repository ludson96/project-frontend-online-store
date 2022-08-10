import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import GetCategory from '../components/GetCategory';
import Header from '../components/Header';
import addItemLocalStorage from '../services/ItemCart';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchInputValue: '',
      itens: [],
      resultsFound: true,
      idCategory: '',
    };
  }

  searchInputOnChange = ({ target }) => {
    this.setState({ searchInputValue: target.value });
  }

  selectCategory = async (id) => {
    this.setState({ idCategory: id });
    const { searchInputValue } = this.state;
    if (searchInputValue !== '') this.searchButtonOnClick();
    const response = await getProductsFromCategoryAndQuery(id, '');
    const itens = response.results;
    this.setState({ itens });
  }
  //

  searchButtonOnClick = async () => {
    const { searchInputValue, idCategory } = this.state;
    const response = await getProductsFromCategoryAndQuery(idCategory, searchInputValue);
    const itens = response.results;
    if (itens.length === 0) this.setState({ resultsFound: false });
    if (itens.length !== 0) this.setState({ resultsFound: true });
    this.setState({ itens });
  }

  render() {
    const { searchInputValue, itens, resultsFound } = this.state;
    const stockMax = 'available_quantity';
    return (
      <div className="home">
        <Header />
        <div className="search-field">
          <input
            data-testid="query-input"
            type="text"
            className="search-input"
            value={ searchInputValue }
            onChange={ this.searchInputOnChange }
          />
          <button
            data-testid="query-button"
            type="button"
            className="search-btn"
            onClick={ this.searchButtonOnClick }
          >
            Pesquisar
          </button>
        </div>
        {(!searchInputValue.length > 0 && itens.length === 0)
        && (
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        )}
        <div className="search-results">
          <div>
            <GetCategory selectCategory={ this.selectCategory } />
          </div>
          {resultsFound ? (
            <div className="itens-container">
              {itens.map((iten) => (
                <div data-testid="product" key={ iten.id } className="iten">
                  <Link
                    to={ `/product-detail/${iten.id}` }
                    data-testid="product-detail-link"
                  >
                    <h3>{iten.title}</h3>
                    <img src={ iten.thumbnail } alt={ iten.title } />
                    <p>
                      R$
                      {iten.price}
                    </p>
                  </Link>
                  <button
                    type="button"
                    className="addCart-btn"
                    data-testid="product-add-to-cart"
                    value={ iten.id }
                    onClick={ () => addItemLocalStorage(iten, stockMax) }
                  >
                    Adicionar ao Carrinho

                  </button>
                </div>
              ))}
            </div>
          ) : <h1 className="product-not-found">Nenhum produto foi encontrado</h1>}
        </div>
      </div>
    );
  }
}
