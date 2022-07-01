import Jwt from "jsonwebtoken";

function generateJwt(id, email, role) {
  return Jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}

export default generateJwt;
