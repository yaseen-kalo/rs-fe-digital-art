import { faker } from '@faker-js/faker'; 

const month = String(faker.date.future().getMonth() + 1).padStart(2, '0');
const year = String(faker.date.future().getFullYear() % 100).padStart(2, '0');

export const creditCard = { 
    ownerName: faker.person.fullName(),
    number: faker.finance.creditCardNumber(),          // e.g. "4539-1488-0343-6467"
    expiry: `${month}/${year}`,
    cvc: faker.finance.creditCardCVV()
};