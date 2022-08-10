function product({ id }, _, { prisma }) {
  return prisma.cartItem.findUnique({ where: { id } }).product();
}

const CartItem = {
  product,
};

export default CartItem;
