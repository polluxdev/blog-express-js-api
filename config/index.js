require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  DOMAIN_APP: process.env.DOMAIN_APP,
  API_VERSION: process.env.API_VERSION,
  PORT: process.env.PORT,
  MAX_RATE_LIMIT: process.env.MAX_RATE_LIMIT,
  RESET_RATE_INTERVAL: process.env.RESET_RATE_INTERVAL,
  mongo: {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  },
  query: {
    QUERY_LIMIT: process.env.QUERY_LIMIT,
  },
};
