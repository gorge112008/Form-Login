import { UserFM } from "../dao/Mongo/classes/DBmanager.js";

const auth = async (req, res, next) => {
  try {
    const { User, Password } = req.body;
    console.log("username", User+" password", Password);
    const response = await UserFM.getUserUnique({
      email: User,
      password: Password,
    });
    if (response) {
      req.session.user = response;
      if (
        response.email === "adminCoder@coder.com" &&
        response.password === "adminCod3r123"
      ) {
        req.session.admin = true;
        res.locals.admin = response;
      }
      return next();
    } else {
      const err={error:"Authentication Error!"}
      return res.status(400).json(err);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

export default auth;
