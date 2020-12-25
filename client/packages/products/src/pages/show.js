import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Add, Close, Title, Subtitle } from '@rlecomm/common';
import FormReview from '../components/form-review';
import Product from '../components/product';
import Review from '../components/review';
import Alert from '../components/alert';
import { Context } from '../context/products';

// Let's pretend we're authenticated
// This is only good running on isolation
const Show = ({
  currentUser = { id: 1, email: 'test@test.com', username: 'rojasleon' }
}) => {
  const { id } = useParams();
  const { isLoading, product, error, fetchProduct, createReview } = useContext(
    Context
  );
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProduct(id);
  }, []);

  if (isLoading) return 'LOADING PRODUCT...';
  if (!product) return 'Product not found';

  return (
    <>
      <Title>Product #{id}</Title>
      <Subtitle>Some details about this product</Subtitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <Product {...product} />
        </div>
        <div className="w-full border border-gray-100 p-2 rounded sm:overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="my-4 text-lg font-semibold">Reviews</h3>
            <span
              onClick={() => setIsCreating((prev) => !prev)}
              className="rounded-full border flex transform transition hover:scale-125">
              {isCreating ? <Close /> : <Add />}
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
          {product.reviews.map((review, i) => (
            <Review
              key={review.id}
              {...review}
              currentUser={currentUser}
              index={i + 1}
            />
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
      </div>
    </>
  );
};

export default Show;
