const checkSession = async (req, res, next) => {
  try {
    const { rol } = res.locals.resUser;
    if (rol == "ADMIN") {
      const currentSessionId = req.session.admin._id;
      const currentPage = req.originalUrl;
      let adminSessions = [];
      let activeSessions = []; // Array para almacenar las sesiones activas
      // Recorre todas las sesiones almacenadas
      req.sessionStore.all((error, sessions) => {
        if (error) {
          console.error("Error al obtener las sesiones:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        // Filtra las sesiones activas, excluyendo la sesión actual
        adminSessions = sessions.filter((session) => session.admin);
        
        activeSessions = adminSessions.filter(
          (session) => session.admin._id != currentSessionId
        );

        // Verifica si hay más sesiones activas aparte de la sesión actual
        if (activeSessions.length == 0) {
          console.log("No hay sesiones activas adicionales");
          next();
        } else {
          console.log("Hay sesiones activas adicionales:");
          //return res.status(200).render("private/Admins", { isLogin: true });
          next();
        }
      });
    } else if (rol == "USER") {
      return res.status(200).render("private/noAdmin", { isLogin: true });
    }
  } catch (error) {
    next(error);
  }
};

export default checkSession;
