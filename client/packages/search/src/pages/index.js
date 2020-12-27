import React from 'react';
import { useParams } from 'react-router-dom';

const A = () => {
  const { term } = useParams();

  return <div>{term}</div>;
};

export default A;
