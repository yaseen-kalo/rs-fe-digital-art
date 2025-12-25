// export const deliveryDetails = {
//     firstName: "Steve",
//     lastName: "Waugh",
//     street: "Linchon Ave",
//     zip: "12345",
//     city: "Berlin",
//     country: "United States of America"
// };



import Chance from "chance" 

const chance = new Chance() 
// Generate random values 
const firstName = chance.first(); 
const lastName = chance.last(); 
const street = chance.street(); 
const zip = chance.zip(); 
const city = chance.city(); 
// Generate country and normalize it 
const rawCountry = chance.country({ full: true })
let country; 
if (rawCountry === "United Kingdom of Great Britain and Northern Ireland") 
    { country = "United Kingdom"; } 
else { country = rawCountry; } 
// Export delivery details object export 
export const deliveryDetails = { firstName: firstName, lastName: lastName, street: street, zip: zip, city: city, country: "Pakistan" };