import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormReview from '../components/form-review';
import Product from '../components/product';
import Review from '../components/review';
import { Context } from '../context/products-context';

const Icon = () => (
  <svg
    className="h-7 w-7 text-white cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

// Let's pretend we're authenticated
// This is only good running on isolation
const Show = ({
  currentUser = { id: 1, email: 'test@test.com', username: 'rojasleon' }
}) => {
  const { id } = useParams();
  const { state, fetchProduct, createReview } = useContext(Context);
  const [isCreating, setIsCreating] = useState(false);

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
      <div className="flex justify-between items-center">
        <h3 className="my-4 text-lg text-gray-600">Reviews.</h3>
        <span
          onClick={() => setIsCreating((prev) => !prev)}
          className="rounded-full bg-black flex w-7 transform transition hover:scale-125">
          <Icon />
        </span>
      </div>
      {isCreating ? (
        <div className="w-8/12 m-auto shadow p-4 mb-4">
          <FormReview
            initialValues={{
              title: '',
              comment: '',
              score: ''
            }}
            onSubmit={createReview}
            productId={state.product.id}
          />
        </div>
      ) : null}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {state.product.reviews.map((review) => (
          <Review key={review.id} {...review} currentUser={currentUser} />
        ))}
      </div>
    </>
  );
};

export default Show;
