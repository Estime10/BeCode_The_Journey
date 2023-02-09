import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { promisify } from "util";

promisify(JWT.verify);

// middleware pour l'authentification du token
<<<<<<< HEAD
export const jwtAuthentification = async (req, res, next) => {

    const token = await req.cookies.access_token;

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized first' });
    }

    JWT.verify(token, process.env.SECRET_JWT, (err, decoded) => {

      if (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      req.decoded = decoded;
      next();
    });
=======
const jwtAuthentification = async (req, res, next) => {
  const token = await req.cookies.access_token;
  if (!token) {
    return res.status(401).send({ error: "authorized first" });
>>>>>>> 1cf883fbca3abfd8057f1b2902bae7b096552ba6
  }
  try{
  const data = JWT.verify(token, process.env.SECRET_JWT)
  console.log(data)
  req.userId = data.id
  console.log(req.userId)
  return next();
  }catch{
    return res.status(403)
  }
  
};

<<<<<<< HEAD
=======
export default jwtAuthentification;
>>>>>>> 1cf883fbca3abfd8057f1b2902bae7b096552ba6
