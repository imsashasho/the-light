export const slideView = ({ src, isThumbnail }) => {
  const isYoutube = src.includes('youtube');
  const isEmbedVideo = src.includes('mp4');
  if (isEmbedVideo) {
    return `
        <div class="swiper-slide">
            <video class="building-swiper-video" width="100%" height="100%">
              <source src="${src}" type="video/mp4">
            </video>
            <button class="building-swiper-video__button">
              <span class="building-swiper-video__triangle"></span>
            </button>
        </div>
    `;
  }
  if (isYoutube) {
    return `
        <div class="swiper-slide">
            <iframe class="building-swiper-video" width="560" height="315" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
    `;
  }
  return `
    <div class="swiper-slide">
        <img src="${src}" alt="">
    </div>
  `;
};

export const slidesView = (slidesSrc, isThumbnail) => slidesSrc.map(src => slideView({ src, isThumbnail }));
