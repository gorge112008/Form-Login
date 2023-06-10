let privateProducts, privateMessages, privateCarts, sessionActive;

const privateController = {
  profile: (req, res) => {
    res.render("private/profile");
  },
  dashboard: (req, res) => {
    res.render("private/dashboard");
  },
  realtimeproducts: (req, res) => {
    const { rol, email } = res.locals.resUser;
    sessionActive=res.locals.activeSessions;
    privateProducts = res.locals.resProducts;
    res.render("private/realtimeProducts", {
      rol: rol,
      user: email,
      body: privateProducts,
    });
  },
};

export default privateController;
export { privateProducts, privateMessages, privateCarts, sessionActive };
