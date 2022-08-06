import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import GetCategory from '../components/GetCategory';

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
    if (searchInputValue !== '') {
      this.searchButtonOnClick();
    }
    const response = await getProductsFromCategoryAndQuery(id, '');
    const itens = response.results;
    this.setState({ itens });
  }

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
    return (
      <div className="home">
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
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <div>
          <GetCategory selectCategory={ this.selectCategory } />
        </div>
        {resultsFound ? (
          <div className="itens-container">
            {itens.map((iten) => (
              <div data-testid="product" key={ iten.id } className="iten">
                <h3>{iten.title}</h3>
                <img src={ iten.thumbnail } alt={ iten.title } />
                <p>
                  RS
                  {iten.price}
                </p>
              </div>
            ))}
          </div>
        ) : <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}
