const Joi = require('joi');

const signInShema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const signUpShema = signInShema.append({
  name: Joi.string().min(2).max(50).required(),
});

module.exports.signInShema = signInShema;
module.exports.signUpShema = signUpShema;
