import { AuthenticationError } from "apollo-server-core";
import { cartItem, signToken, updateCart } from "../utils";

async function login(_, { username }, { prisma, res, cookies }) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new AuthenticationError(`${username} doesn't exist`);

  const { refresh_token, expires_in } = signToken(user.id);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    // signed: true,
    maxAge: expires_in,
  });

  if (cookies?.cartId) {
    const guestCart = await prisma.cart.findUnique({
      where: { id: cookies.cartId },
      include: { cartItems: true },
    });

    const cartItemIds = guestCart.cartItems?.map((item) => ({ id: item.id }));

    await prisma.cart.update({
      where: { id: guestCart.id },
      data: { cartItems: { disconnect: cartItemIds } },
    });

    await prisma.cart.update({
      where: { id: user.cartId },
      data: { cartItems: { connect: cartItemIds } },
    });

    await prisma.cart.delete({ where: { id: guestCart.id } });

    res.clearCookie("cartId");
  }

  return {
    user,
    refresh_token,
    expires_in,
  };
}

async function refreshToken(_, __, { prisma, userId, res }) {
  if (!userId) {
    return {
      user: null,
      refresh_token: null,
      expires_in: null,
    };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AuthenticationError(`user doesn't authenticated`);

  const { refresh_token, expires_in } = signToken(userId);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    // signed: true,
    maxAge: expires_in,
  });

  return {
    user,
    refresh_token,
    expires_in,
  };
}

function logout(_, __, { res }) {
  res.clearCookie("refresh_token");
  return {
    message: "You have been successfully logged out",
  };
}

async function fetchOrcreateCart(_, __, { prisma, userId, res, cookies }) {
  const guestCartId = cookies?.cartId;

  if (userId) {
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) throw new UserInputError(`${userId} is wrong input`);
    const cart = await prisma.cart.findUnique({ where: { id: user.cartId } });
    if (!cart)
      throw new UserInputError(
        `${user.name} with the id ${user.id} must has a cart`
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

  res.cookie("cartId", cart.id);

  return cart;
}

async function addItemToCart(_, { item }, { prisma, userId, res, cookies }) {
  const guestCartId = cookies?.cartId;

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UserInputError(`${userId} doesn't exist`);
    return updateCart({
      id: user.cartId,
      item: cartItem(item),
      cartQueryUpdate: prisma.cart.update,
    });
  }

  if (guestCartId) {
    return updateCart({
      id: guestCartId,
      item: cartItem(item),
      cartQueryUpdate: prisma.cart.update,
    });
  }

  const cart = await prisma.cart.create({
    data: {
      cartItems: {
        create: [cartItem(item)],
      },
    },
  });

  res.cookie("cartId", cart.id);

  return cart;
}

// function createOrder(_, { products }, { prisma, res }) {}

const Mutation = {
  login,
  refreshToken,
  logout,
  fetchOrcreateCart,
  addItemToCart,
};

export default Mutation;
