import { Router } from "express";
const routerCookie = Router();

/*****************************************************************GET*************************************************************/
routerCookie.get("/getCookie", (req, res) => {
  //TRAER COOKIE
  res.send(req.cookies);
});

routerCookie.get("/getUserCookie", (req, res) => {
  const userCookie = req.signedCookies.UserCookie;
  // Verificar si la cookie existe
  userCookie?res.send({email:userCookie}):res.send({email:""});
});

routerCookie.post("/setUserCookie", (req, res) => {
  //SETEAR COOKIE
  const { user, timer } = req.body;
  const time = timer ? timer : 5000;
  res.cookie("UserCookie", user, { maxAge: time , signed: true,}).send({email:user});
});

routerCookie.get("/delUserCookie", (req, res) => {
  const nameCookie= req.body.name;
  res.clearCookie(nameCookie).send("Cookie borrada");
});

routerCookie.post("/setSignedCookie", (req, res) => {
  const { user, password } = req.body;
  res
    .cookie("User", user, {
      maxAge: 30000,
      signed: true,
    })
    .cookie("Password", password, {
      maxAge: 30000,
      signed: true,
    })
    .send(req.body);
});

routerCookie.get("/getSignedCookie", (req, res) => {
  res.send(req.signedCookies);
});

export default routerCookie;
