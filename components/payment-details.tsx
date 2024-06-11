import { AtmCard, Stripe } from "../utils/assets";

export const PaymentDetails = [
  {
    icon: <AtmCard />,
    id: 1,
    name: "Gabriel Inyamah",
    stars: 4,
    code: "8509",
    expiry: "09/25",
    cvv: "645",
    email: null, // Optional property
  },
  {
    icon: <Stripe />,
    id:2,
    name: "Gabriel Inyamah",
    stars: null, // Optional property
    code: null, // Optional property
    expiry: null, // Optional property
    cvv: null, // Optional property
    email: "inyamahgabrielimoh@gmail.com",
  },
];
