import { Brand } from "../common/models";

async function create(brandData) {
  return await Brand.create(brandData);
}

async function getAll() {
  return await Brand.findAll();
}

async function getOne(brandData) {
  const brand = await Brand.findOne({
    where: {
      name: brandData.name,
    },
  });
  if (brand === null) return [];

  return brand;
}

async function update(brandData) {
  return await Brand.update(brandData, {
    where: {
      id: brandData.id,
    },
  });
}

async function remove(brandData) {
  return await Brand.destroy({
    where: {
      id: brandData.id,
    },
  });
}

export { create, getAll, getOne, update, remove };
