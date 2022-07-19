async function series({ id }, _, { prisma }, { variableValues }) {
  const series = await prisma.category
    .findUnique({
      where: { id },
    })
    .series();

  if (!variableValues.serieId) return series;

  const serie = series.filter((serie) => serie.id === variableValues.serieId);

  return serie;
}

const Category = {
  series,
};

export default Category;
