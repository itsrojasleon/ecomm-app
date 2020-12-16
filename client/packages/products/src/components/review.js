import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/products-context';
import FormReview from './form-review';
import Rating from './rating';

const Review = ({ id, title, comment, score, userId, currentUser }) => {
  const { updateReview, removeReview } = useContext(Context);
  const history = useHistory();

  const [isUpdading, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = userId === currentUser.id;

  const renderContentForOwner = () => (
    <div className="mt-4 border border-gray-100 rounded p-2">
      <p className="text-gray-500 pb-2 text-center">Actions</p>
      <div className="flex justify-between">
        <svg
          onClick={() => {
            setIsUpdating((prev) => !prev);
            setIsDeleting(false);
          }}
          className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          onClick={() => {
            setIsDeleting((prev) => !prev);
            setIsUpdating(false);
          }}
          className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      {isUpdading ? (
        <FormReview
          initialValues={{ title, comment, score }}
          onSubmit={updateReview}
          onCancel={setIsUpdating}
          id={id}
        />
      ) : null}
      {isDeleting ? renderWarning() : null}
    </div>
  );

  const renderWarning = () => (
    <div className="mt-8 space-y-6">
      <p>Are you sure you want to delete this review?</p>
      <div className="flex gap-3">
        <button
          onClick={() => setIsDeleting(false)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          Cancel
        </button>
        <button
          onClick={() => removeReview(id)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-700">{comment}</p>
      <div className="flex justify-between">
        <p>{score}</p>
        <Rating defaultStars={score} />
      </div>
      {isOwner ? renderContentForOwner() : <div>SOME</div>}
    </div>
  );
};

export default Review;
