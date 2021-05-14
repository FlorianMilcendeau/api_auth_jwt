const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

/** Read private key */
const pathToPrivKey = path.join(__dirname, '../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf-8');

/** Generate Json Web Token
 *
 * @param {object} user
 * @returns {{token: string, expiresIn: number}} Json Web Token and his expiration.
 */
const generateToken = (user) => {
  const { id, name, email } = user;
  const payload = {
    id,
    name,
    email,
    iat: Date.now(),
  };
  const expiresIn = 1000 * 60 * 5; // 5 min

  // token generated and singed.
  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

  return { expiresIn, token: `Bearer ${signedToken}` };
};

/** Extraction of the Json Web Token
 *
 * @param {string} headerValue
 * @returns {(false|string)} False if not a string, otherwise the token.
 */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== 'string') {
    return false;
  }

  // Extract the "bearer" from the token..
  const matches = headerValue.match(/(Bearer)\s+(\S+)/i);

  return matches && matches[2];
};

module.exports.generateToken = generateToken;
module.exports.extractBearerToken = extractBearerToken;
