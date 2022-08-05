import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="search-field">
          <input type="text" className="search-input" />
          <button type="submit" className="search-btn">Pesquisar</button>
        </div>
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}
