import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormReview from '../components/form-review';
import Product from '../components/product';
import Review from '../components/review';
import Alert from '../components/alert';
import { Add } from '../components/icons';
import { Context as ProductsContext } from '../context/products';
import { Context as ReviewsContext } from '../context/reviews';

// Let's pretend we're authenticated
// This is only good running on isolation
const Show = ({
  currentUser = { id: 1, email: 'test@test.com', username: 'rojasleon' }
}) => {
  const { id } = useParams();
  const { product, error, isLoading, fetchProduct } = useContext(
    ProductsContext
  );
  const { createReview } = useContext(ReviewsContext);

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProduct(id);
  }, []);

  if (isLoading) return 'Loading product...';
  if (!product) return 'Product not found';

  return (
    <>
      <Product {...product} />
      <div className="flex justify-between items-center">
        <h3 className="my-4 text-lg text-gray-600">Reviews.</h3>
        <span
          onClick={() => setIsCreating((prev) => !prev)}
          className="rounded-full bg-black flex w-7 transform transition hover:scale-125">
          <Add />
        </span>
      </div>
      {isCreating ? (
        <div className="w-8/12 m-auto shadow p-4 mb-4">
          <h3 className="text-lg font-bold">Create a review</h3>
          <FormReview
            initialValues={{
              productId: product.id,
              title: '',
              comment: '',
              score: 1
            }}
            onSubmit={createReview}
            onCancel={setIsCreating}
          />
        </div>
      ) : null}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {product.reviews.map((review) => (
          <Review key={review.id} {...review} currentUser={currentUser} />
        ))}
      </div>
      {error.length > 0 && (
        <>
          {error.map((error, i) => (
            <div
              key={error.message}
              className={`absolute bottom-0 right-0 left-0`}>
              <Alert color="red">{error.message}</Alert>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Show;
