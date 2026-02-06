import { firstNamesMale, firstNamesFemale, lastNames, streets, emailDomains, locations } from './constants';
import { Identity, CreditCardData, GenderFilter, Gender } from './types';

export const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePhone = (): string => {
  return `(${getRandomInt(200, 999)}) ${getRandomInt(200, 999)}-${getRandomInt(1000, 9999)}`;
};

export const generateBirthdayAndAge = (): { age: number; birthday: string } => {
  const age = getRandomInt(20, 60); 
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const month = getRandomInt(1, 12);
  const day = getRandomInt(1, 28);
  const birthDate = new Date(birthYear, month - 1, day);
  return { age, birthday: birthDate.toISOString().split('T')[0] };
};

export const generateCreditCard = (): CreditCardData => {
  let number = "4";
  for (let i = 0; i < 15; i++) number += String(getRandomInt(0, 9));
  const formatted = number.replace(/(\d{4})/g, '$1 ').trim();
  const expMonth = String(getRandomInt(1, 12)).padStart(2, '0');
  const expYear = String(new Date().getFullYear() + getRandomInt(2, 6)).slice(-2);
  const cvv = String(getRandomInt(100, 999));
  return { number: formatted, exp: `${expMonth}/${expYear}`, cvv };
};

export const generateStreet2 = (): string => {
  // 70% chance of having a secondary address line
  if (Math.random() > 0.3) {
     const types = ["Apt", "Unit", "Ste"];
     const type = getRandom(types);
     const num = getRandomInt(1, 999);
     return `${type} ${num}`;
  }
  return "";
};

export const createNewIdentity = (filter: GenderFilter): Identity => {
  const isMale = filter === 'random' ? Math.random() > 0.5 : filter === 'male';
  const firstName = getRandom(isMale ? firstNamesMale : firstNamesFemale);
  const lastName = getRandom(lastNames);
  
  const loc = getRandom(locations);
  const cityData = getRandom(loc.cities);
  const streetNum = getRandomInt(100, 9999);
  const addressStr = `${streetNum} ${getRandom(streets)}`;
  const street2 = generateStreet2();
  
  const { age, birthday } = generateBirthdayAndAge();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1, 99)}@${getRandom(emailDomains)}`;
  
  return {
    gender: isMale ? 'male' : 'female',
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    phone: generatePhone(),
    email,
    birthday,
    age,
    address: {
      street: addressStr,
      street2,
      city: cityData.name,
      state: loc.state,
      stateAbbr: loc.abbr,
      zip: cityData.zip,
    },
    creditCard: generateCreditCard(),
    uuid: crypto.randomUUID(),
  };
};