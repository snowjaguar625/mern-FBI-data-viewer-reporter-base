const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("Bearer header- ", bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    console.log("Bearer ", bearer);
    const bearerToken = bearer[1];
    console.log("Bearer token ", bearerToken);
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
