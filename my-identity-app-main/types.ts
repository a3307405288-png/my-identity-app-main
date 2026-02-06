import { LucideIcon } from 'lucide-react';

export type Gender = 'male' | 'female';
export type GenderFilter = 'random' | 'male' | 'female';
export type LangCode = 'en' | 'zh';

export interface Address {
  street: string;
  street2: string;
  city: string;
  state: string;
  stateAbbr: string;
  zip: string;
}

export interface CreditCardData {
  number: string;
  exp: string;
  cvv: string;
}

export interface Identity {
  gender: Gender;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  birthday: string;
  age: number;
  address: Address;
  creditCard: CreditCardData;
  uuid: string;
}

export interface LocationData {
  state: string;
  abbr: string;
  cities: { name: string; zip: string }[];
}

export interface DataItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface Translations {
  title: string;
  subtitle: string;
  random: string;
  male: string;
  female: string;
  generate: string;
  processing: string;
  physicalAssets: string;
  dataPoints: string;
  personalInfo: string;
  contactAddress: string;
  financialSecurity: string;
  footer: string;
  ageYear: string;
  headers: {
    personal: string;
    contact: string;
    location: string;
    financial: string;
    visualAssets: string;
  };
  labels: {
    fullName: string;
    gender: string;
    birthDate: string;
    age: string;
    phone: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    cardNumber: string;
    cardExpiry: string;
    cvv: string;
  };
}