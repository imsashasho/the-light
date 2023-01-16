export const transformConstructionResponse = response => {
  const years = response.filter.map(data => {
    const { year, months } = data;
    return { year, months };
  });

  const constructions = response.data.map(item => {
    const { id, data } = item;
    return {
      id,
      countPics: data.count_gallery,
      countVideos: data.count_videos,
      gallery: data.gallery,
      month: data.nameMonth.toLowerCase(),
      year: data.year,
      img: data.img,
      monthString: data.nameMonth,
      previewSrc: data.gallery && data.gallery[0],
      day: data.day,
      descr: data.title,
      date: `${data.day}.${data.month}.${data.year}`,
    };
  });

  return { years, constructions };
};
