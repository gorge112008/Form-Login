import { Router } from "express";
import middlewareInitProducts from "../middlewares/initProductsMiddleware.js";
import middlewareInitMessages from "../middlewares/initMessagesMiddleware.js";
import middlewareInitCart from "../middlewares/initCartMiddleware.js";
import validateSession from "../middlewares/validateSessionMiddleware.js";

const routerViews = Router();
let resProducts, resMessages, resCarts, session;

routerViews.get("/", validateSession, (req, res) => {
  res.render("index", {style:"/css/index.css"});
});

routerViews.get("/login", (req, res) => {
  res.render("login", { isLogin: true, style:"/css/login.css" });
});

routerViews.get("/signup", (req, res) => {
  res.render("signup", { isLogin: true, style:"/css/signup.css" });
});

routerViews.get("/root", validateSession, (req, res) => {
  const { name } = req.query;
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Bienvenido ${req.session.name} por ${req.session.counter} vez`);
    res.render("login", { isLogin: true });
  } else {
    req.session.counter = 1;
    req.session.name = name !== undefined ? name : "Anonimo";
    res.send(`Bienvenido ${name !== undefined ? name : "Anonimo"}`);
    res.render("login", { isLogin: true});
  }
});

routerViews.get("/profile/:pid", validateSession, (req, res) => {
  res.render("profile", {});
});

routerViews.get("/home", validateSession, middlewareInitProducts, async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("home",{body: resProducts, style: "/css/style.css"});
});

routerViews.get(
  "/realtimeproducts",
  validateSession,
  middlewareInitProducts,
  async (req, res) => {
    resProducts = res.locals.resProducts;
    res.render("realtimeproducts", { resProducts });
  }
);

routerViews.get(
  "/realtimeproducts/:pid",
  validateSession,
  middlewareInitProducts,
  async (req, res) => {
    resProducts = res.locals.resProducts;
    res.render("realtimeproducts", { resProducts });
  }
);

routerViews.get("/products", validateSession, middlewareInitProducts, async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("products", { resProducts });
});

routerViews.get(
  "/products/:pid",
  validateSession,
  middlewareInitProducts,
  async (req, res) => {
    resProducts = res.locals.resProducts;
    res.render("products", { resProducts });
  }
);

routerViews.get("/cart", validateSession, middlewareInitCart, async (req, res) => {
  resCarts = res.locals.resCarts;
  res.render("cart", { resCarts });
});

routerViews.get("/cart/:cid", validateSession, middlewareInitCart, async (req, res) => {
  resCarts = res.locals.resCarts;
  res.render("cart", { resCarts });
});

routerViews.get("/chat", validateSession, middlewareInitMessages, async (req, res) => {
  resMessages = res.locals.resMessages;
  res.render("chat", { resMessages });
});

export default routerViews;
export { resProducts, resMessages, resCarts };
