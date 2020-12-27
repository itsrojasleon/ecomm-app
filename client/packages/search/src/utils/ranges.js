/**
 * Returns an array with five ranges
 *
 * @param {number} prices Array of numbers
 * @return {number[]} Five numbers within an array
 */
export const getRanges = (prices) => {
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const step = (max - min) / prices.length;

  const ranges = [];

  for (let i = min; i <= max; i += step) {
    ranges.push(i);
  }

  return ranges;
};
