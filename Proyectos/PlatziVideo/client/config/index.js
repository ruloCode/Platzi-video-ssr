require('dotenv').config();

const config = {
  dev: process.env.ENV || 'production',
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'http://localhost',
  
};
module.exports = { config };