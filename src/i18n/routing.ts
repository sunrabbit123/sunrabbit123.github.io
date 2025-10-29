import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ko', 'en'],

  // Used when no locale matches
  defaultLocale: 'ko',

  // Always show locale in URL for static export compatibility
  localePrefix: 'always'
});
