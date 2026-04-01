# WordPress migration: Construction page

## 1) Files to copy into your theme

- `construction.php` → root of active theme
- `inc/construction-integration.php` → `inc/` folder of active theme
- `acf-json/*.json` → `acf-json/` folder of active theme

## 2) Connect PHP integration

In `functions.php` add:

```php
require_once get_template_directory() . '/inc/construction-integration.php';
```

## 3) Import ACF field groups

In WordPress admin:

- ACF → Tools → Import Field Groups
- import both JSON files from `acf-json/`

Or keep `acf-json` in theme for local JSON sync.

## 4) Create content

1. Create page “Construction” and assign template **Construction Page**.
2. Fill page fields (status text, progress items, optional filter descriptions by year/month).
3. Add posts of type **Construction items**:
   - Date
   - Description
   - Gallery
   - Video URLs

## 5) Frontend API bridge

Template `construction.php` sets:

- `window.thelightApi.ajaxUrl = admin_url('admin-ajax.php')`

Frontend JS uses this URL for action `constructions`.
