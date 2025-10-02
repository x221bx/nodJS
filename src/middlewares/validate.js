function isSchema(s) {
  return s && typeof s.validate === 'function';
}

function validate(schemas = {}) {
  return (req, res, next) => {
    try {
      const options = { abortEarly: false, stripUnknown: true, convert: true };
      if (isSchema(schemas.body)) {
        const { error, value } = schemas.body.validate(req.body, options);
        if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
        req.body = value;
      }
      if (isSchema(schemas.params)) {
        const { error, value } = schemas.params.validate(req.params, options);
        if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
        req.params = value;
      }
      if (isSchema(schemas.query)) {
        const { error, value } = schemas.query.validate(req.query, options);
        if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
        req.query = value;
      }
      return next();
    } catch (err) {
      return res.status(500).json({ message: 'Validation middleware error' });
    }
  };
}

module.exports = { validate };
