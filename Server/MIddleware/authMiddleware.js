const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "meow", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkCurrUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "meow", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        if (user) {
          console.log(`The Current user is with email ${user.email}`);
        }
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const dispCurrUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "meow", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        req.user = null;
        return next();
      }

      const user = await User.findById(decodedToken.id);

      if (user) {
        console.log(`The Current user is with email ${user.email}`);
      }

      req.user = user;
      next();
    });
  } else {
    req.user = null;
    next();
  }
};
module.exports = { requireAuth, checkCurrUser, dispCurrUser };
