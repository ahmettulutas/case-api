
import {faker} from "@faker-js/faker";

export const generateDummyPayment = () => {
  
  const packageIds = [faker.number.int(), faker.number.int(), faker.number.int(), faker.number.int()];
  const cardHolderName = faker.person.fullName();
  const cardNumber = faker.number.int();
  const totalAmount = faker.number.int({ max: 200 });
  const currency = faker.finance.currencyCode();
  const expireDate = faker.date.anytime();
  const cvv = faker.finance.creditCardCVV();

  return {
    packageIds,
    cardHolderName,
    cardNumber,
    expireDate,
    cvv,
    totalAmount,
    currency,
  };
};