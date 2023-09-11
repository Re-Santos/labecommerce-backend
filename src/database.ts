import {TUser,TProduct} from './types';

export const users: TUser[] = [
 {
   id:"u001",
   name:"Fulano",
   email:"fulano@email.com",
   password:"fulano123",
   createdAt:new Date().toLocaleString(),
 },
 {
    id:"u002",
    name:"Beltrana",
    email:"beltrana@email.com",
    password:"beltrana00",
    createdAt:new Date().toLocaleString()
 },
];

export const products: TProduct[] = [
 {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",

 },
 {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
]