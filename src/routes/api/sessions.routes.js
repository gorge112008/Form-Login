import { Router } from "express";
import { UserFM} from "../../dao/Mongo/classes/DBmanager.js";
import auth from "../../middlewares/authMiddleware.js";

const routerSessions = Router();

routerSessions.get("/login", (req, res) => {
  res.status(200).json("products");
});

routerSessions.post("/login", async (req, res) => {
  try {
    let user;
    admin = res.locals.admin;
    admin ? (user = admin) : (user = req.body);
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerSessions.post("/signup", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const response = await UserFM.addUser({
        first_name:first_name,
        last_name: last_name,
        email:email,
        password:password,
        age:age,
      });
      if (response.new===true) {
        res.status(201).redirect("/login");
      }else if(response.new===false){
        res.status(201).redirect("/signup");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

routerSessions.post("/session",auth, (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    const msj = `BIENVENIDO ${req.session.user}`;
    res.status(200).json({ success: msj});
  } else {
    const msj = `BIENVENIDO ${req.session.user}`;
    req.session.counter = 1;
    res.status(200).json({success: msj});
}
});

routerSessions.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error al cerrar sesion");
    } else {
      const msj = `HA FINALIZADO SU SESION CORRECTAMENTE`;
      res.status(200).json(msj);
    }
  });
});

export default routerSessions;
