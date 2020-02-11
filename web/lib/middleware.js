exports.hypermedia = (req, res, next) => {
  req.hypermediaBase = `${req.protocol}://${req.get('host')}`;
  next();
};