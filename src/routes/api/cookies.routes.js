import { Router } from "express";
const routerCookie = Router();

/*****************************************************************GET*************************************************************/
/*routerCookie.get('/set', (req, res) => {
  // Configurar una cookie
  res.cookie('miCookie', 'valor de la cookie', { maxAge: 3600000, signed: true });
  res.send('Cookie establecida');
});

routerCookie.get('/get', (req, res) => {
  // Obtener el valor de una cookie
  const miCookie = req.signedCookies;
  res.send(`El valor de la cookie es:`+JSON.stringify(miCookie));
});
*/
routerCookie.get("/getUserCookie", (req, res) => {
  const userCookie = req.signedCookies.UserCookie;
  userCookie ? res.send({ email: userCookie.email }) : res.send({ email: "" });
});

routerCookie.get("/getSessionCookie", (req, res) => {
  try {
    const sessionCookie = req.signedCookies.connect.sid?req.signedCookies.connect.sid:null;
  if (sessionCookie) {
    res.send({ data: sessionCookie});
  }else{
    res.send({ data: ""});
  }
  } catch (error) {
    console.error("Error reading session " + error);
  }
  
});

/*****************************************************************POST*************************************************************/

routerCookie.post("/setUserCookie", (req, res) => {
  const { user, timer } = req.body;
  const time = timer ? timer : null;
  res
    .cookie("UserCookie", { email: user }, {
      maxAge: time,
      signed: true,
    });
  res.send({ email: user });
});
/*
routerCookie.post("/setSessionCookie", (req, res) => {
  const { data, rol } = req.body;
  res
    .cookie(
      "SessionCookie",
      { data:data ,rol: rol},
      {
        signed: true,
      }
    );
  res.send({data:data ,rol: rol});
});*/

/*****************************************************************DELETE*************************************************************/
routerCookie.delete("/delCookie", (req, res) => {
  const nameCookie = req.body.name;
  res.clearCookie(nameCookie);
  res.send("Cookie borrada");
});

export default routerCookie;
