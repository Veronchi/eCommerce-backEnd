import { Category } from "../common/models";

async function create(categoryData) {
  return await Category.create(categoryData);
}

async function getAll() {
  return await Category.findAll();
}

async function getOne(categoryData) {
  const category = await Category.findOne({
    where: {
      name: categoryData.name,
    },
  });
  if (category === null) return [];

  return category;
}

async function update(categoryData) {
  return await Category.update(categoryData, {
    where: {
      id: categoryData.id,
    },
  });
}

async function remove(categoryData) {
  return await Category.destroy({
    where: {
      id: categoryData.id,
    },
  });
}

export { create, getAll, getOne, update, remove };
