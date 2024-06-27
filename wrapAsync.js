const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      next(e);
    });
  };
};

module.exports = wrapAsync;
