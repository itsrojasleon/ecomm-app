// return the total amount of money
export const sum = (arr) => {
  return arr.reduce(
    (accumulator, item) => accumulator + item.product.price * item.quantity,
    0
  );
};
