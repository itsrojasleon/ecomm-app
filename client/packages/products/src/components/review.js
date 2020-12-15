import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/products-context';

const Review = ({ review, currentUser }) => {
  const { updateReview, removeReview } = useContext(Context);
  const history = useHistory();

  const [title, setTitle] = useState(review.title);
  const [comment, setComment] = useState(review.comment);
  const [score, setScore] = useState(review.score);

  const [isUpdading, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = review.userId === currentUser.id;

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
      {isUpdading ? renderForm() : null}
      {isDeleting ? renderWarning() : null}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    updateReview({ id: review.id, title, comment, score }).then(() => {
      history.push('/products');
    });
  };

  const renderForm = () => (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="pb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
            placeholder="title"
          />
        </div>
        <div className="pb-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
            placeholder="comment"
          />
        </div>
        <div>
          <input
            type="number"
            min={0}
            max={5}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="rounded-md w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-gray-500 sm:text-sm"
            placeholder="score"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setIsUpdating(false)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          Cancel
        </button>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Update
        </button>
      </div>
    </form>
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
          onClick={() => {
            removeReview(review.id).then(() => history.push('/products'));
          }}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <h3 className="font-semibold">{review.title}</h3>
      <p className="text-gray-700">{review.comment}</p>
      <p>{review.score}</p>
      {isOwner ? renderContentForOwner() : <div>SOME</div>}
    </div>
  );
};

export default Review;
