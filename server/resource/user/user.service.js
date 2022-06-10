import { User } from "../common/models";

async function read(userData) {
  return await User.findOne({
    where: userData.login,
  });
}

async function create(userData) {
  return await User.create(userData);
}

async function update(userData) {
  return await User.update(userData, {
    where: {
      login: userData.login,
    },
  });
}

async function remove(userData) {
  return await User.destroy({
    where: {
      login: userData.login,
    },
  });
}

export { read, create, update };
