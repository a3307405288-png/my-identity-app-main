import { LocationData, Translations } from './types';

export const firstNamesMale = [
  "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
  "Chris", "Daniel", "Matthew", "Anthony", "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth",
  "Joshua", "Kevin", "Brian", "George", "Edward", "Ronald", "Tim", "Jason", "Jeff", "Ryan"
];

export const firstNamesFemale = [
  "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
  "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kim", "Emily", "Donna", "Michelle",
  "Dorothy", "Carol", "Amanda", "Melissa", "Deborah", "Steph", "Becky", "Sharon", "Laura", "Cynthia"
];

export const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Lewis", "Robinson", "Walker"
];

export const streets = [
  "Maple St", "Oak Ave", "Washington Blvd", "Park Rd", "Main St", "Lincoln Hwy",
  "Pine Ln", "Cedar Dr", "Elm Ct", "Lakeview Way", "Sunset Blvd", "River Rd", "Highland Ave",
  "2nd St", "Broadway", "Church St", "Chestnut Dr", "Hilltop Rd", "Prospect Ave", "Franklin St"
];

export const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];

export const locations: LocationData[] = [
  { state: "California", abbr: "CA", cities: [{ name: "Los Angeles", zip: "90001" }, { name: "San Francisco", zip: "94105" }, { name: "San Diego", zip: "92101" }] },
  { state: "New York", abbr: "NY", cities: [{ name: "New York", zip: "10001" }, { name: "Buffalo", zip: "14201" }, { name: "Albany", zip: "12207" }] },
  { state: "Texas", abbr: "TX", cities: [{ name: "Houston", zip: "77002" }, { name: "Austin", zip: "78701" }, { name: "Dallas", zip: "75201" }] },
  { state: "Florida", abbr: "FL", cities: [{ name: "Miami", zip: "33101" }, { name: "Orlando", zip: "32801" }, { name: "Tampa", zip: "33602" }] },
  { state: "Illinois", abbr: "IL", cities: [{ name: "Chicago", zip: "60601" }, { name: "Springfield", zip: "62701" }] },
  { state: "Washington", abbr: "WA", cities: [{ name: "Seattle", zip: "98101" }, { name: "Spokane", zip: "99201" }] },
];

export const UI_TEXT: Record<string, Translations> = {
  en: {
    title: "US Identity Generator",
    subtitle: "Mock Data Sandbox",
    random: "Random",
    male: "Male",
    female: "Female",
    generate: "Generate New",
    processing: "Processing...",
    physicalAssets: "Physical Assets",
    dataPoints: "Identity Details",
    personalInfo: "Personal Info",
    contactAddress: "Contact & Address",
    financialSecurity: "Financial",
    footer: "Generated locally in your browser • No data is stored",
    ageYear: "years",
    headers: {
      personal: "PERSONAL_DATA",
      contact: "CONTACT_INFO",
      location: "LOCATION_DATA",
      financial: "FINANCIAL_RECORDS",
      visualAssets: "VISUAL_ASSETS"
    },
    labels: {
      fullName: "Name",
      gender: "Sex",
      birthDate: "DOB",
      age: "Age",
      phone: "Phone",
      email: "Email",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      city: "City",
      state: "State",
      zipCode: "Zip Code",
      cardNumber: "Card",
      cardExpiry: "Exp",
      cvv: "CVV"
    }
  },
  zh: {
    title: "美国身份生成器",
    subtitle: "虚拟数据沙盒",
    random: "随机",
    male: "男",
    female: "女",
    generate: "生成新身份",
    processing: "处理中...",
    physicalAssets: "实体证件预览",
    dataPoints: "身份详情",
    personalInfo: "基础信息",
    contactAddress: "联系方式",
    financialSecurity: "财务信息",
    footer: "在您的浏览器本地生成 • 不存储任何数据",
    ageYear: "岁",
    headers: {
      personal: "个人数据 (PERSONAL_DATA)",
      contact: "联系方式 (CONTACT_INFO)",
      location: "位置数据 (LOCATION_DATA)",
      financial: "财务记录 (FINANCIAL_RECORDS)",
      visualAssets: "可视化资产 (VISUAL_ASSETS)"
    },
    labels: {
      fullName: "姓名",
      gender: "性别",
      birthDate: "生日",
      age: "年龄",
      phone: "电话",
      email: "邮箱",
      addressLine1: "地址第一行",
      addressLine2: "地址第二行",
      city: "城市",
      state: "州/省",
      zipCode: "邮政编码",
      cardNumber: "卡号",
      cardExpiry: "有效期",
      cvv: "CVV"
    }
  }
};