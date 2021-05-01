import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Container } from 'react-bootstrap';
import './Filter.scss';

const Filter = () => {
  const { categories, setFilter } = useContext(AppContext);
  return (
    <Container fluid>
      <div className="filter ">
        <ul className="filter__list">
          {categories.map((category) => (
            <li
              className="filter__list--item"
              key={category._id}
              onClick={() => setFilter(category._id)}
            >
              {category.name}
            </li>
          ))}
          <li className="filter__list--item" onClick={() => setFilter('')}>
            All
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Filter;
