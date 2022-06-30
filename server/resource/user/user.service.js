import { User, Basket } from "../common/models";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import ApiError from "../../error/ApiError";

function generateJwt(id, email, role) {
  return Jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    {expiresIn: "24h"}
  );
}

async function registration(userData) {
  const { login, email, password, role } = userData;

  if (!login || !password) {
    return ApiError.badRequest("incorrect login or password");
  }

  const condidate = await User.findOne({ where: { login, email } });

  if (condidate) {
    return ApiError.badRequest(
      "user with such login or email address already exists"
    );
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ login, email, role, password: hashPassword });
  const basket = await Basket.create({ UserId: user.id });
  const token = generateJwt(user.id, user.email, user.role);

  return token;
}

async function update(userData) {
  return await User.update(userData, {
    where: {
      id: userData.id,
    },
  });
}

async function remove(userData) {
  return await User.destroy({
    where: {
      id: userData.id,
    },
  });
}

export { read, registration, update, remove };
