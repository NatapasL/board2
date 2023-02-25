
require('dotenv').config()


// @ts-check
/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  trailingSlash: true,
  env: {
    HOST: process.env.HOST || 'http://0.0.0.0:3000',
    BACKEND_BASE_URL:
      process.env.BACKEND_BASE_URL ||
        'https://asia-southeast2-reader-app-fe4ab.cloudfunctions.net/fanboi-api'
  },
}
