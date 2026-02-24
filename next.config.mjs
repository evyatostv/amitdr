import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig = {
  redirects: async () => [
    {
      source: '/appointment',
      destination: '/book',
      permanent: true
    },
    {
      source: '/appoinment',
      destination: '/book',
      permanent: true
    },
    {
      source: '/book-appointment',
      destination: '/book',
      permanent: true
    },
    {
      source: '/book-apointment',
      destination: '/book',
      permanent: true
    },
    {
      source: '/:locale(en|he)/appointment',
      destination: '/:locale/book',
      permanent: true
    },
    {
      source: '/:locale(en|he)/appoinment',
      destination: '/:locale/book',
      permanent: true
    },
    {
      source: '/:locale(en|he)/book-appointment',
      destination: '/:locale/book',
      permanent: true
    }
  ]
};

export default withNextIntl(nextConfig);
