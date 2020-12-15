import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/product';
import Review from '../components/review';
import { Context } from '../context/products-context';

// Let's pretend we're authenticated
// This is only good running on isolation
const Show = ({
  currentUser = { id: 1, email: 'test@test.com', username: 'rojasleon' }
}) => {
  const { id } = useParams();
  const { state, fetchProduct } = useContext(Context);

  useEffect(() => {
    fetchProduct(id);
  }, []);

  if (state.errors) {
    return (
      <>
        {state.errors.map((error, i) => (
          <div key={i}>{error.message}</div>
        ))}
      </>
    );
  }

  if (state.isLoading) return 'LOADING PRODUCT...';
  if (!state.product) return 'Product not found';

  return (
    <>
      <Product {...state.product} />
      <h3 className="my-3 text-lg text-gray-600">Reviews.</h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {state.product.reviews.map((review) => (
          <Review key={review.id} review={review} currentUser={currentUser} />
        ))}
      </div>
    </>
  );
};

export default Show;
