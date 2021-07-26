const validator = (shema) => (req, res, next) => {
  const result = shema.validate(req.body);

  if (result.error) {
    return res.status(422).json({ errors: result.error });
  }

  return next();
};

module.exports = validator;
