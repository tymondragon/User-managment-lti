exports.hypermedia = (req, res, next) => {
  req.hypermediaBase = `${req.protocol}://${req.get('host')}`;
  console.log(req.hypermediaBase)
  next();
};