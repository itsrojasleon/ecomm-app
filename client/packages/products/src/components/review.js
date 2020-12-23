import React, { useState, useContext } from 'react';
import { Write, Trash } from '@rlecomm/common';
import FormReview from './form-review';
import Rating from './rating';
import { Context } from '../context/products';

const Review = ({ id, title, comment, score, userId, currentUser, index }) => {
  const { updateReview, removeReview } = useContext(Context);

  const [isUpdading, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = userId === currentUser.id;

  const onWrite = () => {
    setIsUpdating((prev) => !prev);
    setIsDeleting(false);
  };

  const onDelete = () => {
    setIsDeleting((prev) => !prev);
    setIsUpdating(false);
  };

  const renderContentForOwner = () => (
    <div className="mt-3">
      <p className="text-green-500 mb-1">Actions</p>
      <div className="flex justify-between">
        <Write onClick={onWrite} />
        <Trash onClick={onDelete} />
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
    <div className="border border-gray-100 p-3 rounded">
      <p className="mb-1"># {index}</p>
      <h3 className="font-semibold uppercase">{title}</h3>
      <p className="text-gray-500 mt-1">{comment}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-500">
          Rating: <strong>{score}</strong>
        </p>
        <Rating defaultStars={score} />
      </div>
      {isOwner && renderContentForOwner()}
    </div>
  );
};

export default Review;
