const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
    
  if (!token) return res.redirect("/login");

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
