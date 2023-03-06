import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-core";
import { cartItem, getTokenPayload, signToken } from "../utils";
import currency from "currency.js";

async function login(_, { username, cartId }, { prisma }) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new AuthenticationError(`${username} doesn't exist`);

  const token = signToken(user.id);

  const payload = getTokenPayload(token);

  const authedCart = await prisma.cart.findUnique({
    where: { id: user.cartId },
    include: { cartItems: true },
  });

  let totalQuantity = authedCart.cartItems.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  if (cartId) {
    const guestCart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: true },
    });

    const cartItemIds = guestCart.cartItems?.map((item) => ({ id: item.id }));

    totalQuantity += guestCart.cartItems.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);

    const totalPrice = currency(guestCart.subtotal).add(authedCart.subtotal);

    await prisma.cart.update({
      where: { id: guestCart.id },
      data: {
        cartItems: { disconnect: cartItemIds },
      },
    });

    await prisma.cart.update({
      where: { id: user.cartId },
      data: {
        subtotal: totalPrice.value,
        formattedSubtotal: `$${totalPrice.value} USD`,
        estimatedTotal: totalPrice.value,
        formattedEstimatedTotal: `$${totalPrice.value} USD`,
        cartItems: { connect: cartItemIds },
      },
    });

    await prisma.cart.delete({ where: { id: guestCart.id } });
  }

  return {
    user,
    token,
    expiresIn: payload.exp,
    totalQuantity,
  };
}

async function refreshToken(_, __, { prisma, userId, token }) {
  if (!token) throw new ForbiddenError(`User is not authenticated`);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ForbiddenError(`User is not authenticated`);

  const refreshedToken = signToken(userId);

  const payload = getTokenPayload(refreshedToken);

  const authedCart = await prisma.cart.findUnique({
    where: { id: user.cartId },
    include: { cartItems: true },
  });

  const totalQuantity = authedCart.cartItems.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return {
    user,
    totalQuantity,
    token: refreshedToken,
    expiresIn: payload.exp,
  };
}

function logout(_, __, { token }) {
  if (!token) new ForbiddenError(`User is not authenticated`);

  return {
    statusCode: 200,
  };
}

async function fetchOrcreateCart(
  _,
  { cartId: guestCartId },
  { prisma, userId, cartId },
) {
  if (userId) {
    const cart = await prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart)
      throw new UserInputError(
        `${user.name} with the id ${user.id} must has a cart`,
      );
    return cart;
  }

  if (guestCartId) {
    const cart = await prisma.cart.findUnique({ where: { id: guestCartId } });
    if (!cart) throw new UserInputError(`${guestCartId} is wrong input`);
    return cart;
  }

  const cart = await prisma.cart.create({
    data: {},
  });

  return cart;
}

async function addItemToCart(
  _,
  { item, price, cartId: guestCartId },
  { prisma, userId, cartId },
) {
  if (!guestCartId && !userId) {
    const cart = await prisma.cart.create({
      data: {
        subtotal: price,
        formattedSubtotal: `$${price} USD`,
        estimatedTotal: price,
        formattedEstimatedTotal: `$${price} USD`,
        cartItems: {
          create: [cartItem(item)],
        },
      },
    });

    return cart;
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId || guestCartId },
  });

  const totalPrice = currency(cart.subtotal).add(currency(price));

  const updatedCart = await prisma.cart.update({
    where: { id: cartId || guestCartId },
    data: {
      subtotal: totalPrice.value,
      formattedSubtotal: `$${totalPrice.value} USD`,
      estimatedTotal: totalPrice.value,
      formattedEstimatedTotal: `$${totalPrice.value} USD`,
      cartItems: {
        create: [cartItem(item)],
      },
    },
    include: {
      cartItems: true
    }
  });

  return updatedCart
}

async function updateCart(_, { cartId, item }, { prisma, userId }) {
  if (!userId && !cartId) throw new ForbiddenError("Forbidden Request");

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true } } },
  });

  let totalPrice =
    cart.cartItems.length > 1
      ? cart.cartItems
          .filter((cartItem) => cartItem.id !== item.itemId)
          .reduce(
            (acc, item) =>
              currency(acc).add(
                currency(item.product.price).multiply(item.quantity),
              ),
            0,
          )
      : { value: 0 };

  totalPrice = currency(totalPrice.value).add(
    currency(item.price).multiply(item.quantity),
  );

  return prisma.cart.update({
    where: { id: cartId },
    data: {
      subtotal: totalPrice.value,
      formattedSubtotal: `$${totalPrice.value} USD`,
      estimatedTotal: totalPrice.value,
      formattedEstimatedTotal: `$${totalPrice.value} USD`,
      cartItems: {
        update: {
          where: { id: item.itemId },
          data: {
            quantity: item.quantity,
          },
        },
      },
    },
  });
}

async function deletecartItem(
  _,
  { itemId, cartId: guestCartId },
  { prisma, cartId },
) {
  const deletedItem = await prisma.cartItem.delete({
    where: { id: itemId },
    include: { product: true },
  });

  const cart = await prisma.cart.findUnique({
    where: { id: cartId || guestCartId },
  });

  const deletedItemPrice = currency(deletedItem.product.price).multiply(
    deletedItem.quantity,
  );

  const totalPrice = currency(cart.subtotal).subtract(deletedItemPrice.value);

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      subtotal: totalPrice.value,
      formattedSubtotal: `$${totalPrice.value} USD`,
      estimatedTotal: totalPrice.value,
      formattedEstimatedTotal: `$${totalPrice.value} USD`,
    },
  });

  return { quantity: deletedItem.quantity };
}

async function signup(_, { username, cartId }, { prisma }) {
  const existUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existUser) throw new UserInputError("This user is already exist!");

  const user = await prisma.user.create({
    data: { username, role: "Customer", cart: { create: {} } },
  });

  const token = signToken(user.id);
  const payload = getTokenPayload(token);

  const authedCart = await prisma.cart.findUnique({
    where: { id: user.cartId },
    include: { cartItems: true },
  });

  let totalQuantity = authedCart.cartItems.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  if (cartId) {
    const guestCart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: true },
    });

    const cartItemIds = guestCart.cartItems?.map((item) => ({ id: item.id }));

    totalQuantity += guestCart.cartItems.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);

    const totalPrice = currency(guestCart.subtotal).add(authedCart.subtotal);

    await prisma.cart.update({
      where: { id: guestCart.id },
      data: {
        cartItems: { disconnect: cartItemIds },
      },
    });

    await prisma.cart.update({
      where: { id: user.cartId },
      data: {
        subtotal: totalPrice.value,
        formattedSubtotal: `$${totalPrice.value} USD`,
        estimatedTotal: totalPrice.value,
        formattedEstimatedTotal: `$${totalPrice.value} USD`,
        cartItems: { connect: cartItemIds },
      },
    });

    await prisma.cart.delete({ where: { id: guestCart.id } });
  }

  return {
    user,
    token,
    expiresIn: payload.exp,
    totalQuantity,
  };
}

const Mutation = {
  login,
  refreshToken,
  logout,
  fetchOrcreateCart,
  addItemToCart,
  updateCart,
  deletecartItem,
  signup,
};

export default Mutation;
