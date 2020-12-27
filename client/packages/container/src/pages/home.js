import React, { useContext } from 'react';
import { Title, Subtitle } from '@rlecomm/common';
import SearchBar from '../components/search-bar';
import { Context } from '../context/container-context';

const Home = () => {
  const { products, searchProducts } = useContext(Context);

  return (
    <div>
      <Title>Home</Title>
      <Subtitle>I</Subtitle>
      <SearchBar onSearch={searchProducts} />
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;
