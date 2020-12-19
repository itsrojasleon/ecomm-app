export const sum = (arr) => {
  // Total in money
  const total = arr.reduce(
    (accumulator, item) => accumulator + item.product.price * item.quantity,
    0
  );

  // Total of items
  const itemsCount = arr.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  // Count how many differents types of products there are
  const count = arr.length;

  return { total, itemsCount, count };
};
