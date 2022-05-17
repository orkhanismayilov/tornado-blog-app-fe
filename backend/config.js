const dotenv = require('dotenv');

const result = dotenv.config({ path: './backend/.env' });
if (result.error) {
  throw result.error;
}

module.exports = result.parsed;
