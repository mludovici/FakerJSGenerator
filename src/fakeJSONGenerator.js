import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
// import { faker } from '@faker-js/faker';

faker.setLocale('de');
 const USERS = [];
let count = 0;

export function createRandomPerson() {
  return {
    id: count++,
    uuid: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    fullName: faker.name.fullName(),
    gender: faker.name.sex(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate().toLocaleDateString(),
    registeredAt: faker.date.past(),
    phone: faker.phone.number("##-####-####"),
    jobTitle: faker.name.jobTitle(),
    jobType: faker.name.jobType(),
    profileInfo: faker.helpers.fake(`Hi, my name is {{name.firstName}} {{name.lastName}}.
    I was born in {{date.birthdate}} and I am currently working as a {{name.jobTitle}} at {{company.name}}.
    Check out my site on {{internet.domainName}} and contact me any time at {{phone.number(+!# !## ### ###!)}}. {{lorem.paragraph(5)}}`),
    address: {
      "country": faker.address.country(),
      "county": faker.address.county(),
      "city": faker.address.city(),
      "streetAddress": faker.address.streetAddress(true),
      "latitude": faker.address.latitude(),
      "longitude": faker.address.longitude(),
      "coordinates": faker.address.nearbyGPSCoordinate(),
      "timezone": faker.address.timeZone(),
      "zipCode": faker.address.zipCode("#####"),
    },
    maybe: faker.helpers.maybe(() => "Yeah I'm here!", {probability: 0.3})
  };
}

const sectors = ["Finance", "Craft","Agriculture","IT","Retail","Construction","Tourism"]

export function createRandomCompany() {
  return {
    uuid: faker.datatype.uuid(),
    companyName: faker.company.name(),
    catchPhrase: faker.company.catchPhrase(),
    sector: function() {
      return  sectors[Math.floor(Math.random() * sectors.length)]
    }(),
    buzz: faker.helpers.fake("{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}"),
    maybe: faker.helpers.maybe(() => "Our company has 20 employees!", {probability: 0.3}),
    companyLogo:  faker.image.imageUrl(800, 600, 'logo')
  }
}

export function createRandomProduct() {
  return {
    uuid : faker.datatype.uuid(),
    productCategory: faker.commerce.product(),
    productName: faker.commerce.productName(),
    productDescription: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    productImage: faker.image.imageUrl(1234, 2345, 'product')

  }
}

export function createRandomPayment() {
  return {
    uuid: faker.datatype.uuid(),
    accountNr: faker.finance.account(),
    accountName: faker.finance.accountName(),
    amount: faker.finance.amount(),
    bic: faker.finance.bic(),
    cvv: faker.finance.creditCardCVV(),
    issuer: faker.finance.creditCardIssuer(),
    creditCardNumber: faker.finance.creditCardNumber(),
    currencyCode: faker.finance.currencyCode(),
    currencyName: faker.finance.currencyName(),
    currencySymbol: faker.finance.currencySymbol(),
    iban: faker.finance.iban(),
    pin: faker.finance.pin(),
    routingNumber: faker.finance.routingNumber(),
    transactionDescription: faker.finance.transactionDescription(),
    transactionType: faker.finance.transactionType(),
  }
}

function generateFakeDataAmountHelper(amount,generatorFunction) {
  if (amount === 0 || amount === null ||amount === undefined) {
    return
  }
  let count = 0;
  let generatedData = []
  Array.from({ length: amount }).forEach(() => {  
    generatedData.push(generatorFunction());
  })
  return generatedData
}

let generatedFakeData = [];


export function generateData(amount, fakeDataType) {
  count = 0;

  console.log("type:", fakeDataType)
  console.log("amount:", amount)  

  switch(fakeDataType) {
    case "person":
      console.log("PERSON WAS CHOESEN!")
      generatedFakeData = generateFakeDataAmountHelper(amount, createRandomPerson)
      console.log("DATA CREATED:", generatedFakeData);
      break;
    case "company":
      console.log("company WAS CHOESEN!")
      generatedFakeData = generateFakeDataAmountHelper(amount, createRandomCompany )

      break;
    case "product":
      console.log("product WAS CHOESEN!")
      generatedFakeData = generateFakeDataAmountHelper(amount, createRandomProduct)

      break;
    case "payment":
      console.log("payment WAS CHOESEN!")
      generatedFakeData = generateFakeDataAmountHelper(amount, createRandomPayment)

      break;
    default:
      console.log("option not valid!")
  }
  return generatedFakeData;
}


export function exportData() {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(generatedFakeData, null, '\t'));
  return data;
}


