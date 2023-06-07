import { Router } from "express";
import { UserFM} from "../../dao/Mongo/classes/DBmanager.js";

const routerSignup = Router();

routerSignup.get("/sessions/signup", (req, res) => {
  res.render("signup", {});
});

routerSignup.post("/sessions/signup", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  try {
    const user = await UserFM.addUser({
      first_name,
      last_name,
      email,
      password,
      age,
    });
    res.status(201).json({ message: "success", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default routerSignup;