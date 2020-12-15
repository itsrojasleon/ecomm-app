import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/products-context';

const FormReview = ({ initialValues, id }) => {
  const { updateReview } = useContext(Context);
  const history = useHistory();

  const [title, setTitle] = useState(initialValues.title);
  const [comment, setComment] = useState(initialValues.comment);
  const [score, setScore] = useState(initialValues.score);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateReview({ id, title, comment, score }).then(() => {
      history.push('/products');
    });
  };

  return (
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
};

export default FormReview;
