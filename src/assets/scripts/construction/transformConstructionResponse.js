const transformConstructionResponse = response => {
  const years = response.filter.map(data => {
    const { year, months } = data;
    return { year, months };
  });

  const constructions = response.data.map(item => {
    const { id, data } = item;
    const monthLabel = data.nameMonth || data.month || '';
    const month = String(monthLabel).toLowerCase();
    const gallery = Array.isArray(data.gallery)
      ? data.gallery.filter(src => typeof src === 'string' && src)
      : [];

    return {
      id,
      countPics: data.count_gallery || data.photo_count || 0,
      countVideos: data.count_videos || data.video_count || 0,
      gallery,
      month,
      year: data.year,
      img: data.img,
      monthString: monthLabel,
      previewSrc: gallery[0] || '',
      day: data.day,
      descr: data.descr || data.title || '',
      date: `${data.day}.${data.month}.${data.year}`,
    };
  });

  return { years, constructions };
};

export default transformConstructionResponse;
