import { Router } from "express";
import middlewareInitProducts from "../middlewares/initProductsMiddleware.js";
import middlewareInitMessages from "../middlewares/initMessagesMiddleware.js";
import middlewareInitCart from "../middlewares/initCartMiddleware.js";

const routerViews = Router();
let resProducts, resMessages,resCarts;

routerViews.get("/", (req, res) => {
  res.render("index", {});
});

routerViews.get("/login", (req, res) => {
  res.render("login", {isLogin:true});
});

routerViews.get("/register", (req, res) => {
  res.render("register", {});
});

routerViews.get("/profile", (req, res) => {
  res.render("profile", {});
});

routerViews.get("/home", middlewareInitProducts ,async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("home", { resProducts});
});

routerViews.get("/realtimeproducts",middlewareInitProducts, async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("realtimeproducts", { resProducts});
});

routerViews.get("/realtimeproducts/:pid",middlewareInitProducts, async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("realtimeproducts", { resProducts});
});

routerViews.get("/products",middlewareInitProducts,async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("products", {resProducts});
});

routerViews.get("/products/:pid",middlewareInitProducts,async (req, res) => {
  resProducts = res.locals.resProducts;
  res.render("products", {resProducts});
});

routerViews.get("/cart",middlewareInitCart,async (req, res) => {
  resCarts = res.locals.resCarts;
  res.render("cart", {resCarts});
});

routerViews.get("/cart/:cid",middlewareInitCart,async (req, res) => {
  resCarts = res.locals.resCarts;
  res.render("cart", {resCarts});
});

routerViews.get("/chat",middlewareInitMessages, async (req, res) => {
  resMessages = res.locals.resMessages;
  res.render("chat", { resMessages});
});

export default routerViews;
export { resProducts, resMessages, resCarts };
