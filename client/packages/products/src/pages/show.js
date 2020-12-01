import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from '../components/product-item';
import { ecomm } from '../../api/ecomm';

const Show = () => {
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await ecomm.get(`/api/products/${id}`);

        setProduct(data);
      } catch (err) {
        setErrors(err.response.data.errors);
      }
    };

    fetchProduct();
  }, []);

  if (errors.length) {
    return (
      <div>
        {errors.map((error, i) => (
          <div key={i}>{error.message}</div>
        ))}
      </div>
    );
  }

  return (
    <>
      <ProductItem {...product} />
    </>
  );
};

export default Show;
