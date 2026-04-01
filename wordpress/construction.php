<?php
/**
 * Template Name: Construction Page
 * Template Post Type: page
 */

get_header();
?>

<script>
  window.thelightApi = {
    ajaxUrl: '<?php echo esc_url(admin_url('admin-ajax.php')); ?>',
  };
</script>

<main class="page__content">
  <section class="construction" id="construction">
    <div class="main-deco">
      <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/feather.png" alt="">
    </div>

    <div class="construction__title-block">
      <h1 class="construction__page-title">construction</h1>
      <h2 class="construction__second-title"><?php echo esc_html(get_field('construction_page_title') ?: 'Хід будівництва'); ?></h2>
    </div>

    <div class="construction-main container">
      <div class="construction-progress">
        <div class="construction-progress__update">
          <div class="construction-progress__update-select">
            <span class="construction-progress__update-title">Статус робіт:</span>
            <div class="construction-progress__update-options">
              <select name="year" class="construction-select construction-progress__years-list-mobile construction-year-mobile" id="year">
                <option value=""><?php esc_html_e('Рік', 'the-light'); ?></option>
              </select>

              <select name="month" class="construction-select construction-month-mobile construction-progress__months-list-mobile" id="month" data-placeholder="Місяць">
                <option value=""><?php esc_html_e('Місяць', 'the-light'); ?></option>
              </select>
            </div>
          </div>

          <p class="construction-progress__update-descr">
            <?php echo wp_kses_post(get_field('construction_status_default') ?: ''); ?>
          </p>
        </div>

        <?php if (have_rows('construction_progress_items')) : ?>
          <div class="construction-progress__figures">
            <div class="construction-progress__figures-list">
              <?php while (have_rows('construction_progress_items')) : the_row(); ?>
                <div class="construction-progress__figures-item">
                  <div class="construction-progress__figures-item-svg">
                    <span class="construction-progress__figures-item-percent"><?php echo esc_html(get_sub_field('percent')); ?>%</span>
                    <svg class="circle" width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="51" cy="51" r="50" stroke="#7E9A9B" stroke-width="2"/>
                      <circle cx="51" cy="51" r="50" stroke="#FFF" stroke-width="2" stroke-dasharray="314" stroke-dashoffset="<?php echo 314 - (314 * (int)get_sub_field('percent') / 100); ?>"/>
                    </svg>
                  </div>
                  <span class="construction-progress__figures-item-text"><?php echo esc_html(get_sub_field('label')); ?></span>
                </div>
              <?php endwhile; ?>
            </div>
          </div>
        <?php else: ?>
          <div class="construction-progress__figures">
            <div class="construction-progress__figures-list">
              <div class="construction-progress__figures-item">
                <div class="construction-progress__figures-item-svg">
                  <span class="construction-progress__figures-item-percent">50%</span>
                  <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="51" cy="51" r="49.5" stroke="#4C4C4C" stroke-dasharray="8 8"/><path d="M51 9C74.196 9 93 27.804 93 51" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <span class="construction-progress__figures-item-text">Будівництво</span>
              </div>
            </div>
          </div>
        <?php endif; ?>
      </div>

      <div class="construction-list"></div>
    </div>
  </section>

  <div class="gallery-wrap gallery-overlay">
    <div class="gallery-overlay-inner">
      <button class="gallery-close-btn" type="button" aria-label="Закрити попап">
        <?php if (function_exists('svg')) {
            svg('close');
        } ?>
      </button>

      <div class="swiper-container swiper-gallery">
        <div class="swiper-wrapper swiper-gallery__wrp"></div>
      </div>

      <div class="gallery-slider__ctr-wrap">
        <div class="gallery-slider__ctr">
          <div class="gallery-item-intro"></div>

          <div class="gallery-slider__pagination"></div>
          <div class="gallery-slider__arrows">
            <button class="gallery-slider__arrow gallery-slider-prev" type="button" aria-label="Попередній слайд">
              <span class="icon-font">
               <svg class="icon--slider-left-w icon icon-arrow-left" role="presentation">
                    <use xlink:href="#icon-slider-left-w"></use>
                </svg>
              </span>
            </button>
            <button class="gallery-slider__arrow gallery-slider-next" type="button" aria-label="Наступний слайд">
              <span class="icon-font">
                <svg class="icon--slider-right-w icon icon-arrow-right" role="presentation">
                    <use xlink:href="#icon-slider-right-w"></use>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer();
