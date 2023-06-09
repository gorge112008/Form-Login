import config from "../config/config.js";
import axios from "axios";

const middlewareInitProfile = async (req, res, next) => {
  try {
    const pid=req.params.pid;
    const Url = `${req.protocol}://${req.hostname}:${config.mongo.port}`;
    const resUser =  await axios.get(`${Url}/api/users/${pid}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
    res.locals.resUser = resUser.data;
    /*PRUEBA SIN PRODUCTOS*/
    //res.locals.resProducts=[];
      next();
  } catch (error) {
    next(error);
  }
};

export default middlewareInitProfile;
