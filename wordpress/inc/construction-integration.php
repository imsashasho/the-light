<?php
/**
 * Construction CPT + AJAX for The Light.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'thelight_register_construction_post_type');
function thelight_register_construction_post_type()
{
    register_post_type('construction_item', [
        'labels' => [
            'name' => __('Construction items', 'the-light'),
            'singular_name' => __('Construction item', 'the-light'),
        ],
        'public' => true,
        'show_ui' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-hammer',
        'supports' => ['title', 'thumbnail', 'editor'],
        'rewrite' => ['slug' => 'construction-item'],
        'has_archive' => false,
    ]);
}

add_action('wp_ajax_constructions', 'thelight_ajax_constructions');
add_action('wp_ajax_nopriv_constructions', 'thelight_ajax_constructions');

function thelight_ajax_constructions()
{
    // Fix: Fallback to grab ALL posts in that category, ordered by date. 
    // Sometimes ACF meta keys aren't saved to 'wp_postmeta' until a post is updated manually for the first time,
    // so using 'meta_key' => 'construction_date' might exclude posts entirely!
    $query = new WP_Query([
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'category_name'  => 'hid-budivnytstva-storinka-zapysiv',
        'posts_per_page' => -1,
    ]);

    // --- DEBUGGING BLOCK START ---
    // If the JS console receives this debug output, we know the AJAX action IS firing,
    // and we can see exactly why no posts are matching (e.g., query returned 0 posts).
    if ($query->found_posts === 0) {
        wp_send_json([
            'debug' => true,
            'message' => 'Zero posts found in category: hid-budivnytstva-storinka-zapysiv',
            'data' => [],
            'filter' => []
        ]);
    }
    // --- DEBUGGING BLOCK END ---

    $items = [];
    $filters_from_posts = [];

    // Debugging: uncomment to see if query is fetching anything at all
    // wp_send_json(['debug_query_count' => $query->found_posts]); 

    while ($query->have_posts()) {
        $query->the_post();

        $post_id = get_the_ID();
        
        // Fetch values
        $date_value = get_field('construction_date', $post_id);
        
        // Fallback to standard post date if ACF date is empty
        $timestamp = $date_value ? strtotime($date_value) : get_post_time('U', false, $post_id);

        // Safe fallback for older WP versions, equivalent to wp_date but older
        $month_name = date_i18n('F', $timestamp);
        $month_number = date_i18n('m', $timestamp);
        $day = date_i18n('d', $timestamp);
        $year = date_i18n('Y', $timestamp);

        $gallery = [];
        $acf_gallery = get_field('construction_gallery', $post_id);

        if (is_array($acf_gallery)) {
            foreach ($acf_gallery as $row) {
                $image = isset($row['img']) ? $row['img'] : null;
                if (is_array($image) && !empty($image['url'])) {
                    $gallery[] = $image['url'];
                } elseif (is_numeric($image)) {
                    $gallery[] = wp_get_attachment_url($image);
                }
            }
        }

        $video_rows = get_field('construction_videos', $post_id);
        if (is_array($video_rows)) {
            foreach ($video_rows as $row) {
                if (!empty($row['video_url'])) {
                    $gallery[] = esc_url_raw($row['video_url']);
                }
            }
        }

        $preview = '';
        if (!empty($gallery[0])) {
            $preview = $gallery[0];
        } elseif (has_post_thumbnail($post_id)) {
            $preview = get_the_post_thumbnail_url($post_id, 'large');
        }

        $descr = get_field('construction_description', $post_id);
        if (!$descr) {
            $descr = get_the_excerpt($post_id);
        }

        $items[] = [
            'id' => $post_id,
            'data' => [
                'day' => $day,
                'month' => $month_name,
                'month_in_digits' => $month_number,
                'nameMonth' => $month_name,
                'year' => $year,
                'title' => get_the_title($post_id),
                'descr' => wp_kses_post($descr),
                'count_gallery' => count(array_filter($gallery, static function ($item) {
                    return !preg_match('/(youtube|youtu\.be|\.mp4$)/i', $item);
                })),
                'count_videos' => count(array_filter($gallery, static function ($item) {
                    return preg_match('/(youtube|youtu\.be|\.mp4$)/i', $item);
                })),
                'gallery' => $gallery,
                'img' => $preview,
            ],
        ];

        if (!isset($filters_from_posts[$year])) {
            $filters_from_posts[$year] = [];
        }

        if (!in_array($month_name, $filters_from_posts[$year], true)) {
            $filters_from_posts[$year][] = $month_name;
        }
    }

    wp_reset_postdata();

    $page_filters = thelight_get_construction_page_filters();

    // Build auto-filters from actual post data (always needed as baseline)
    $auto_filters = [];
    krsort($filters_from_posts); // newest year first
    foreach ($filters_from_posts as $filter_year => $months) {
        $auto_filters[(string) $filter_year] = [
            'year' => (string) $filter_year,
            'months' => array_map(static function ($month_name) {
                return [
                    'name' => $month_name,
                    'description' => '',
                ];
            }, $months),
        ];
    }

    // Merge: page filters provide descriptions, auto-filters ensure all years/months with data are present
    $filters = [];
    $page_filters_by_year = [];
    foreach ($page_filters as $pf) {
        $page_filters_by_year[$pf['year']] = $pf;
    }

    // Include all years from posts (with page-filter descriptions where available)
    foreach ($auto_filters as $y => $af) {
        if (isset($page_filters_by_year[$y])) {
            // Use page-filter (has descriptions), but ensure all months with data are present
            $pf = $page_filters_by_year[$y];
            $pf_month_names = array_map(function($m) { return $m['name']; }, $pf['months']);
            foreach ($af['months'] as $am) {
                if (!in_array($am['name'], $pf_month_names, true)) {
                    $pf['months'][] = $am;
                }
            }
            $filters[] = $pf;
        } else {
            $filters[] = $af;
        }
    }
    // Only years with actual posts are included — page-filter-only years are skipped

    // Sort by year descending
    usort($filters, function($a, $b) {
        return strcmp($b['year'], $a['year']);
    });

    wp_send_json([
        'data' => $items,
        'filter' => array_values($filters),
    ]);
}

function thelight_get_construction_page_filters()
{
    $page_id = thelight_get_construction_page_id();

    if (!$page_id || !have_rows('construction_filters', $page_id)) {
        return [];
    }

    $filters = [];

    while (have_rows('construction_filters', $page_id)) {
        the_row();

        $year = get_sub_field('year');
        $months = [];

        if (have_rows('months')) {
            while (have_rows('months')) {
                the_row();

                $months[] = [
                    'name' => (string) get_sub_field('name'),
                    'description' => (string) get_sub_field('description'),
                ];
            }
        }

        if ($year) {
            $filters[] = [
                'year' => (string) $year,
                'months' => $months,
            ];
        }
    }

    return $filters;
}

function thelight_get_construction_page_id()
{
    $pages = get_pages([
        'meta_key' => '_wp_page_template',
        'meta_value' => 'construction.php',
        'number' => 1,
    ]);

    if (empty($pages)) {
        return 0;
    }

    return (int) $pages[0]->ID;
}
