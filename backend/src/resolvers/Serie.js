function products({ id }, _, { prisma }) {
  return prisma.serie.findUnique({ where: { id } }).products();
}

const Serie = {
  products,
};

export default Serie;
