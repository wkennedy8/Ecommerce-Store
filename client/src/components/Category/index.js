import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Category = ({ category }) => {
  const history = useHistory();
  return (
    <Card onClick={() => history.push(`/${category._id}`)}>
      <Card.Header>{category.name}</Card.Header>
    </Card>
  );
};

export default Category;
