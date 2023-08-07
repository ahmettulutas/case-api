import {faker} from "@faker-js/faker";

export const generateDummyPackageItem = () => {
  const imagePath = faker.image.urlPicsumPhotos();
  const name = `Paket Adı ${faker.number.int({ min: 1, max: 10 })}`;
  
  const details = [
    faker.commerce.productMaterial(),
    faker.commerce.productAdjective(),
    faker.commerce.product(),
  ];
  
  const tags = [
    faker.commerce.department(),
    faker.commerce.product(),
    faker.commerce.productDescription(),
  ];
  
  const amount = faker.number.int({ max: 200 });
  const currency = '₺';

  return {
    imagePath,
    name,
    details,
    tags,
    amount,
    currency,
  };
};

