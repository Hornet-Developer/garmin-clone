function series({ id }, _, { prisma }) {
  return prisma.category.findUnique({ where: { id } }).series();
}

const Category = {
  series,
};

export default Category;
