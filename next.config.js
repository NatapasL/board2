require('dotenv').config();

// @ts-check
/**
 * @type {import('next').NextConfig}
 **/

const nextPWA = require('next-pwa');

const withPWA = nextPWA({
  dest: 'public',
});

module.exports = withPWA({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/boards',
        permanent: true,
      },
    ]
  },
  trailingSlash: true,
  env: {
    HOST: process.env.HOST || 'http://0.0.0.0:3000',
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || '/api/common',
    BOARD_URL: process.env.BOARD_URL,
  },
  compiler: {
    styledComponents: true
  }
});
