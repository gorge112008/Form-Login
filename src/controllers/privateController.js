let privateProducts, privateMessages, privateCarts;

const privateController = {
  profile: (req, res) => {
    res.render("private/profile");
  },
  dashboard: (req, res) => {
    res.render("private/dashboard");
  },
  realtimeproducts: (req, res) => {
    const { rol, email } = res.locals.resUser;
    privateProducts = res.locals.resProducts;
    if (rol == "ADMIN") {
      res.render("private/realtimeProducts", {
        rol: rol,
        user: email,
        body: privateProducts,
      });
    } else if (rol == "USER") {
      res.render("private/noAdmin", { isLogin: true });
    }
  },
};

export default privateController;
export { privateProducts, privateMessages, privateCarts };
