import { UserInputError } from "apollo-server-core";

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

const Query = {
  banners,
  featureds,
  pods,
  categories,
  products,
  productsByCategory,
};

export default Query;
