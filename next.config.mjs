import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');
const isDev = process.env.NODE_ENV === 'development';
const configuredBasePath = (process.env.NEXT_BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim();
const normalizedBasePath =
  configuredBasePath && configuredBasePath !== '/'
    ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
    : '';

const nextConfig = {
  // Isolate dev artifacts from build artifacts to prevent cross-corruption.
  distDir: isDev ? '.next-dev' : '.next',
  output: 'export',
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: normalizedBasePath
  },
  trailingSlash: true,
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath ? `${normalizedBasePath}/` : undefined,
  redirects: async () =>
    normalizedBasePath
      ? []
      : [
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
        ],
  webpack: (config, {dev}) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  }
};

export default withNextIntl(nextConfig);
