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

//Criando novo usuário
export function createUser(
    id:string, 
    name:string, 
    email:string, 
    password:string
    ): string{
    const createdAt = new Date().toLocaleString();
    const newUser: TUser = {id, name, email, password,createdAt};
    users.push(newUser);
    return "Cadastro realizado com sucesso";
}


// buscando todos os usuários
export function getAllUsers(): TUser[]{
    return users;
}


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

//criando novo produto
export function createProduct(
    id: string, 
    name: string, 
    price: number, 
    description: string, 
    imageUrl: string
    ): string {
    const newProduct: TProduct = {id, name, price, description, imageUrl};
    products.push(newProduct);
    return "Produto criado com sucesso";
}

//buscando todos os produtos
export function getAllProducts(): TProduct[]{
    return products;
}

//buscando produtos por nome
export function searchProductsByName(name:string):TProduct[] {
    const searchName= name.toLowerCase();
    const resultados: TProduct[]=products.filter((produto)=>
    produto.name.toLowerCase().includes(searchName));
    return resultados;
}