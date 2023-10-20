import {
    users, 
    products, 
    createUser, 
    getAllUsers,
    createProduct, 
    getAllProducts,
    searchProductsByName
} from './database';
import express, {Request, Response} from 'express';
import cors from 'cors'
import { TProduct, TUser } from './types';
import { db } from './database/knex'

// console.log("Usuários:", users);
// console.log("Produtos:", products);

// //criando novo usário
// const resultRegistration = createUser (
//     "u003", 
//     "Astrodev", 
//     "astrodev@email.com", 
//     "astrodev99"
// );
// console.log (resultRegistration)

// //buscando todos os usuários
// const listUsers = getAllUsers();
// console.log ("Lista de Usuários:", listUsers)

// //criando novo produto
// const resultCreateProduct = createProduct(
//     "prod003",
//     "SSD gamer",
//     349.99,
//     "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
//     "https://images.unsplash.com/photo"
// );
// console.log(resultCreateProduct);

// //buscando todos os produtos
// const listProducts = getAllProducts();
// console.log ("Lista de produtos:", listProducts)

// //buscando produto por nome
// const searchName = "gamer";
// const productsFound = searchProductsByName(searchName);
// console.log(`Produtos encontrados com o termo "${searchName}":`,productsFound)


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result: TUser[] =await db.raw('SELECT * FROM users');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Ocorreu um erro ao buscar os usuários' });
    }
});

app.post('/users', (req:Request, res:Response):void=>{
    try {
        const {id, name, email, password}: TUser= req.body;

        if (typeof id !== 'string' || typeof email !== 'string' || typeof password !== 'string'){
            res.statusCode = 400;
            throw new Error ('O valor digitado precisa ser uma string.')
        }
        if (!id.trim() || !email.trim() || !password.trim()) {
            res.statusCode = 400;
            throw new Error ('retire os espaços vazios do valor digitado.')
        }
        if (typeof name !== 'string' || name.trim().length < 2) {
            throw new Error("O valor digitado em 'name' deve ser uma string com pelo menos dois caracteres.");
          }
        if(users.some(user=>user.id===id)){
            res.statusCode = 400;
            throw new Error ("Esse 'id' já está sendo utilizado.")
        }
        if (users.some(user=>user.email === email)){
            res.statusCode = 400;
            throw new Error ("Esse 'email' já está sendo utilizado.")
        }
        if (!email.includes('@')){
            res.statusCode = 400;
            throw new Error ("Este email é inválido.")
        }
    
        const newUser: TUser ={
            id, 
            name, 
            email, 
            password,
        }
    
        users.push(newUser)
        res.status(201).send ('Novo usuário cadastrado com sucesso')

    } catch (error) {
        if(error instanceof Error){
            res.status(400).send (error.message)
        }
    }
    
})


app.delete('/users/:id',(req:Request, res:Response): void=>{
    try {
        const id: string = req.params.id
        const indexToDelete = users.findIndex((user)=>user.id === id)

        if(indexToDelete >=0){
            users.splice(indexToDelete,1)
            res.status(200).send({message:"Usuário apagado com sucesso"})
        }else{
            res.statusCode=404;
            throw new Error ("Usuário não encontrado. Verifique o 'id'.")
        }

        
    } catch (error) {
        if (error instanceof Error){
            res.status(404).send({message:error.message})
        }
    }
        
})



app.get('/products', async (req:Request, res:Response)=>{
    try {
        const query: string | undefined = req.query.q as string | undefined;

        let resultProducts: TProduct[] = await db.raw('SELECT*FROM products');

        if(query && query.length >= 1 ){

            resultProducts = products.filter((product)=>product.name.toLowerCase().includes(query.toLowerCase()))
            res.statusCode = 400;
            throw new Error ("O parâmetro 'name' deve ser uma string e possuir pelo menos um caractere. ")
        }
            res.status(200).send(resultProducts);

    } catch (error) {
        if(error instanceof Error){
        res.status(400).send (error.message)
        }
    }
   
});
 
app.get('/products/search', async (req, res) => {
    try {
        const query = req.query.q as string;

        if (query) {
            const searchName = `%${query}%`;
            const productsByName = await db.raw('SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?)', [searchName]);

            if (productsByName && productsByName[0]) {
                res.status(200).send(productsByName[0]);
            } else {
                res.status(404).send('Nenhum produto encontrado com o nome informado');
            }
        } else {
            const allProducts = await db.raw('SELECT * FROM products');

            if (allProducts && allProducts[0]) {
                res.status(200).send(allProducts[0]);
            } else {
                res.status(404).send('Nenhum produto encontrado.');
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});
//filtra produtos por nome

app.post('/products', (req:Request, res:Response):void=>{
    try {
        const {id, name, price, description, imageUrl}: TProduct= req.body;

        if (typeof id !== 'string' || !id.trim()){
            res.statusCode = 400;
            throw new Error ("O valor digitado para o 'id' deve ser uma string e não pode conter espaços vazios.")
        }
        if (typeof name !== 'string' ){
            res.statusCode = 400;
            throw new Error ("O valor digitado para 'name' dever ser uma string, não pode conter espaços vazios e deve possui mais de 2 caracteres.")
        }
        if (typeof price !== 'number' || price<= 0){
            res.statusCode = 400;
            throw new Error ("O valor digitado para o 'price' deve ser um número positivo.")
        }
        if (typeof description !== 'string'){
            res.statusCode = 400;
            throw new Error ("O valor digitado para 'description' deve ser uma string.")
        }
        if (typeof imageUrl !== 'string'){
            res.statusCode = 400;
            throw new Error ("O valor digitado para 'description' deve ser uma string.")
        }
        if(products.some(product=>product.id===id)){
            res.statusCode = 400;
            throw new Error ("Esse 'id' já está sendo utilizado.")
        }

        const newProduct: TProduct ={
            id,
            name,
            price,
            description, 
            imageUrl
    }

        products.push(newProduct)
        res.status(201).send ('Novo produto cadastrado com sucesso')

    } catch (error) {
        if(error instanceof Error){
        res.status(400).send (error.message)
        }
    }
    
})

app.delete('/products/:id',(req:Request, res:Response):void=>{
    try{
        const id:string = req.params.id
        const indexToDelete = products.findIndex((product)=>product.id === id)

        if(indexToDelete >=0){
            products.splice(indexToDelete,1)
            res.status(200).send({message:"Produto apagado com sucesso"})
        }else{
            res.statusCode=404;
            throw new Error ("Produto não encontrado. Verifique o 'id'.")
            
        }

    } catch(error){
        if(error instanceof Error){
            res.status(404).send({message:error.message})
        }

    }
    
})

app.put ('/products/:id',(req:Request, res:Response):void=>{

    try{
        const id:string = req.params.id;

        const product = products.find((product)=>product.id === id)
        if(!product){
            res.statusCode=404;
            throw new Error ("Produto não encontrado.")
            return;
        }
        
        if(req.body.name !== undefined){
            const newName= req.body.name as string
            product.name = newName
           
        }
    
        if(req.body.price !== undefined && req.body.price <= 0){
            const newPrice= req.body.price as number
            product.price = newPrice
            res.statusCode = 404;
            throw new Error ("O preço do produto deve ser maior que zero.")
        }
        if(req.body.description !== undefined){
            const newDescription= req.body.description as string
            product.description = newDescription
        }
        if(req.body.imageUrl !== undefined){
            const newImageUrl= req.body.imageUrl as string
            product.name = newImageUrl
        }
        

        res.status(200).send({ message: "Produto atualizado com sucesso" });
        
            
    
    } catch(error){
        if(error instanceof Error){
            res.status(404).send({message:error.message})
        }
    }
});
