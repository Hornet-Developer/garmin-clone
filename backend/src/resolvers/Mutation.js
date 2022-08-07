import { AuthenticationError } from "apollo-server-core";
import { signToken } from "../utils";

async function login(_, { username }, { prisma, res }) {
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

// async function createCart(_, __, { prisma, userId }) {
//   const existCart = await prisma.cart.findUnique({ where: { userId } });
//   if (existCart) return existCart;
//   const newCart = await prisma.cart.create({
//     data: {
//       userId,
//     },
//   });
//   return newCart;
// }

async function addItemToCart(_, { item }, { prisma, userId, res, cookies }) {
  let cart;
  const cartId = cookies?.cartId;

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : undefined;

  cart = user
    ? await prisma.cart.findUnique({ where: { id: user.cartId } })
    : cartId
    ? await prisma.cart.findUnique({ where: { id: cartId } })
    : undefined;

  if (!cart) {
    cart = userId
      ? await prisma.cart.create({
          data: { user: { connect: { id: userId } } },
        })
      : await prisma.cart.create({
          data: {},
        });
  }

  if (!userId || !cartId) {
    res.cookie("cartId", cart.id);
  }

  // const existCart =
  //   userId || cartId
  //     ? await prisma.cart.findMany({
  //         where: { OR: [{ userId }, { id: cartId }] },
  //       })
  //     : undefined;

  // let cart;

  // if (!existCart || (existCart && existCart.length === 0)) {
  //   const data = userId ? { userId } : {};
  //   cart = await prisma.cart.create({
  //     data,
  //   });
  //   if (!userId) {
  //     res.cookie("cartId", cart.id);
  //   }
  // }
  // console.log(cartId);

  // return prisma.cart.update({
  //   where: { id: existCart?.[0].id || cart.id },
  //   data: {
  //     cartItems: {
  //       create: [
  //         {
  //           product: { connect: { id: item.productId } },
  //           model: { connect: { id: item.modelId } },
  //           features: { create: [...item.features] },
  //         },
  //       ],
  //     },
  //   },
  // });
  return cart;
}

// function createOrder(_, { products }, { prisma, res }) {}

const Mutation = {
  login,
  refreshToken,
  logout,
  // createCart,
  addItemToCart,
};

export default Mutation;
