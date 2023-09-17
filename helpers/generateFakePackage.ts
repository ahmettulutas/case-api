import { faker } from "@faker-js/faker";

export const generateDummyPackageItem = () => {
  const imagePath = faker.image.urlPicsumPhotos();
  const name = `Paket Adı ${faker.number.int({ min: 1, max: 10 })}`;
  
  const details = [
    faker.commerce.productMaterial(),
    faker.commerce.productAdjective(),
    faker.commerce.productAdjective(),
  ];
  
  const tags = [
    faker.commerce.department(),
    faker.commerce.productAdjective(),
    faker.commerce.productAdjective(),
  ];
  
  const amount = faker.number.int({ max: 200 });
  const currency = "₺";
  const moreInformation = faker.lorem.paragraph({ min:4, max:10 });
  const price = faker.commerce.price();

  return {
    imagePath,
    name,
    details,
    tags,
    amount,
    currency,
    moreInformation,
    price
  };
};

