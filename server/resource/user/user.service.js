import { User, Basket } from "../common/models";
import bcrypt from "bcrypt";
import generateJwt from "../../middleware/JwtGenerator";
import ApiError from "../../error/ApiError";

async function registration(userData) {
  const { login, email, password, role } = userData;

  if (!login || !password) {
    throw ApiError.badRequest("login or password not entered");
  }

  const condidate = await User.findOne({ where: { login, email } });

  if (condidate) {
    throw ApiError.badRequest(
      "user with such login or email address already exists"
    );
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    login,
    email,
    role,
    password: hashPassword,
  });
  const basket = await Basket.create({ UserId: user.id });
  const token = generateJwt(user.id, user.email, user.role);

  return token;
}

async function login(userData) {
  const { login, password } = userData;
  const user = await User.findOne({ where: { login } });

  if (!user) {
    throw ApiError.internal("User is not found");
  }

  let comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw ApiError.internal("Invalid password or login");
  }

  return generateJwt(user.id, user.email, user.role);
}

async function check(userData) {
  const token = generateJwt(userData.id, userData.email, userData.role);

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

export { registration, login, check, update, remove };
