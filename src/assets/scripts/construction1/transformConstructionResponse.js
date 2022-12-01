export const transformConstructionResponse = (response) => {
  const years = response.filter.map((data) => {
    const { year, months } = data;
    return { year, months };
  });

  const constructions = response.data.map((item) => {
    const { id, data } = item;
    return {
      id,
      gallery: data.gallery,
      month: data.month,
      year: data.year,
      previewSrc: data.gallery && data.gallery[0],
      date: `${data.day}.${data.month_in_digits}.${data.year}`,
    };
  });

  return { years, constructions };
};
