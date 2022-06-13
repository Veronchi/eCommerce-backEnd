import { User } from "../common/models";

async function read(userData) {
  const user = await User.findOne({
    where:{
      login: userData.login,
    } 
  });
  if(user === null) return [];

  return user;
}

async function create(userData) {
  return await User.create(userData);
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

export { read, create, update, remove };
