import { ForbiddenError, UserInputError } from "apollo-server-core";

function banners(_, __, { prisma }) {
  return prisma.banner.findMany();
}

function featureds(_, __, { prisma }) {
  return prisma.featured.findMany();
}

function pods(_, __, { prisma }) {
  return prisma.pod.findMany();
}

function categories(_, __, { prisma }) {
  return prisma.category.findMany();
}

function category(_, { id }, { prisma }) {
  return prisma.category.findUnique({
    where: { id },
  });
}

function serie(_, { id }, { prisma }) {
  return prisma.serie.findUnique({
    where: { id },
  });
}

async function products(
  _,
  { filter, search, categoryId, serieId },
  { prisma }
) {
  if (!filter && !search && !categoryId && !serieId)
    return prisma.product.findMany();

  const orderBy = filter?.price
    ? { price: filter?.price }
    : filter?.date
    ? { createdAt: filter?.date }
    : { createdAt: "desc" };

  if (serieId) {
    const existSerie = await prisma.serie.findMany({
      where: {
        AND: [
          {
            id: serieId,
          },
          {
            categoryId,
          },
        ],
      },
    });
    if (!existSerie[0]) throw new UserInputError(`${serieId} doesn't exist`);

    return prisma.product.findMany({
      take: filter?.take,
      where: {
        AND: [
          {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { subDescription: { contains: search, mode: "insensitive" } },
            ],
          },
          { gender: filter?.gender },
          { serieId },
        ],
      },
      orderBy,
    });
  }

  const series = await prisma.serie.findMany({
    where: {
      categoryId,
    },
    select: {
      id: true,
    },
  });

  const serieIds = series.map((serie) => ({ serieId: serie.id }));

  const products = await prisma.product.findMany({
    take: filter?.take,
    where: {
      AND: [
        { OR: serieIds },
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { subDescription: { contains: search, mode: "insensitive" } },
          ],
        },
        { gender: filter?.gender },
      ],
    },
    orderBy,
  });

  return products;
}

async function productsByCategory(_, { categoryId, serieId }, { prisma }) {
  if (serieId) {
    const existSerie = await prisma.serie.findMany({
      where: {
        AND: [
          {
            id: serieId,
          },
          {
            categoryId,
          },
        ],
      },
    });

    if (!existSerie[0]) throw new UserInputError(`${serieId} doesn't exist`);

    return prisma.product.findMany({
      where: {
        serieId,
      },
    });
  }

  const series = await prisma.serie.findMany({
    where: {
      categoryId,
    },
    select: {
      id: true,
    },
  });

  const serieIds = series.map((serie) => ({ serieId: serie.id }));

  const products = await prisma.product.findMany({
    where: {
      OR: serieIds,
    },
  });

  return products;
}

function product(_, { id }, { prisma }) {
  return prisma.product.findUnique({
    where: { id },
  });
}

async function cart(
  _,
  { cartId },
  { prisma, userId, cartId: authedCartId }
) {
  if (userId) {
    if (cartId !== authedCartId) throw new ForbiddenError("Forbidden Request");
    return await prisma.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: true },
    });
  }

  if (cartId) {
    if (cartId !== cartId)
      throw new ForbiddenError("Forbidden Request");
    return await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        cartItems: {
          include: {
            product: true,
            model: true,
            features: true,
          },
        },
      },
    });
  }

  throw new ForbiddenError("Forbidden Request");
}

async function initialCart(_, { cartId }, { prisma }) {
  return await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: true },
  });
}

async function fetchUserSession(_, __, { prisma, userId, token, expiresIn }) {
  if (!userId) {
    return {
      user: null,
      token: null,
      expiresIn: null,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { cart: { include: { cartItems: true } } },
  });
  if (!user) throw new AuthenticationError(`user doesn't authenticated`);

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
    token: token,
    expiresIn,
  };
}

async function cartItemsCount(_, { cartId }, { prisma }) {
  if (!cartId) return { count: 0 };

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: true },
  });

  const count =
    cart?.cartItems.length > 0
      ? cart.cartItems.reduce((acc, item) => {
          acc += item.quantity;
          return acc;
        }, 0)
      : 0;

  return { count };
}

const Query = {
  banners,
  featureds,
  pods,
  categories,
  category,
  serie,
  products,
  productsByCategory,
  product,
  cart,
  fetchUserSession,
  initialCart,
  cartItemsCount,
};

export default Query;
