import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class GetCategory extends Component {
  state = {
    categoriesList: [],
  };

  componentDidMount() {
    this.searchApi();
  }

  searchApi = async () => {
    const data = await getCategories();
    this.setState({ categoriesList: data });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div className="category">
        {categoriesList.map((item) => (
          <label
            data-testid="category"
            key={ item.id }
            htmlFor={ item.id }
            className="categoryRadio"
          >
            <input
              id={ item.id }
              type="radio"
              name="category"
              value={ item.id }
            />
            {item.name}
          </label>
        ))}
      </div>
    );
  }
}
