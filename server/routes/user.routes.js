const UserController = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyToken");

module.exports = (app) => {
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);
  app.post("/logout", UserController.logout);
  app.get("/api/user", verifyToken, UserController.getLoggedInUser);
};
