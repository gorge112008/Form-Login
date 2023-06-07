import { Router } from "express";
import { UserFM} from "../../dao/Mongo/classes/DBmanager.js";

const routerLogin = Router();

routerLogin.get("/sessions/login", (req, res) => {
  res.render("login", {});
});

routerLogin.post("/sessions/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await UserFM.getUser({
      email: username,
      password: password,
    });
    if (response) {
        req.session.user = response;
      res.status(200).json({ message: "success", data: response });
    } else {
      res.status(404).json({ message: "error", data: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default routerLogin;