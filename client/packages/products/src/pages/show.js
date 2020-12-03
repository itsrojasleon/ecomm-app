import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
// import ProductItem from '../components/product-item';
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

  if (Object.values(product).length === 0) return <div>No product</div>;

  return <Product {...product} />;
};

export default Show;
