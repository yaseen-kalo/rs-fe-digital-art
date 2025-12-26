// export const deliveryDetails = {
//     firstName: "Steve",
//     lastName: "Waugh",
//     street: "Linchon Ave",
//     zip: "12345",
//     city: "Berlin",
//     country: "United States of America"
// };



import { faker } from '@faker-js/faker'; 

// Generate random values 
const firstName = faker.person.firstName(); 
const lastName = faker.person.lastName(); 
const street = faker.location.street(); 
const zip = faker.location.zipCode(); 
const city = faker.location.city(); 
// Generate country and normalize it 
const rawCountry = faker.location.country({ full: true })
let country; 
if (rawCountry === "United Kingdom of Great Britain and Northern Ireland" 
    || rawCountry === "Lao People's Democratic Republic"
    || rawCountry === "Hong Kong" 
    || "Falkland Islands (Malvinas)") 
    { country = "United Kingdom"; } 
else { country = rawCountry; } 



// Export delivery details object export 
export const deliveryDetails = { firstName: firstName, lastName: lastName, street: street, zip: zip, city: city, country: country };
