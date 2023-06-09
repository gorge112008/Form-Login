import middlewareGetProfile from "../../middlewares/initProfileMiddleware.js";

routerProducts.get("/profile", middlewareGetProfile, async (req, res) => {
    try {
      const user = res.locals.resUser;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: err });
    }
  });