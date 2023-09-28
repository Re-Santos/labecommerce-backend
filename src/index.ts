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




console.log("Usuários:", users);
console.log("Produtos:", products);

//criando novo usário
const resultRegistration = createUser (
    "u003", 
    "Astrodev", 
    "astrodev@email.com", 
    "astrodev99"
);
console.log (resultRegistration)

//buscando todos os usuários
const listUsers = getAllUsers();
console.log ("Lista de Usuários:", listUsers)

//criando novo produto
const resultCreateProduct = createProduct(
    "prod003",
    "SSD gamer",
    349.99,
    "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
    "https://images.unsplash.com/photo"
);
console.log(resultCreateProduct);

//buscando todos os produtos
const listProducts = getAllProducts();
console.log ("Lista de produtos:", listProducts)

//buscando produto por nome
const searchName = "gamer";
const productsFound = searchProductsByName(searchName);
console.log(`Produtos encontrados com o termo "${searchName}":`,productsFound)


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    const users: TUser[] = getAllUsers();
    res.status(200).send(users);
});

app.post('/users', (req:Request, res:Response)=>{
    const {id, name, email, password}: TUser= req.body;

    const newUser: TUser ={
        id,
        name,
        email,
        password, 
    }

    users.push(newUser)
    res.status(201).send ('Novo usuário cadastrado com sucesso')

})

app.delete('/users/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const indexToDelete = users.findIndex((user)=>user.id === id)

    if(indexToDelete >=0){
        users.splice(indexToDelete,1)
    }else{
        console.log("Não há itens para deletar")
    }

    res.status(200).send({message:"User apagado com sucesso"})
})

app.get('/products', (req:Request, res:Response)=>{
    const resultProducts: TProduct[] = products;
    res.status(200).send(resultProducts);
});

app.get('/products/search', (req:Request, res:Response)=>{
    const query: string = req.query.q as string;
    if (query) {
        const productsByName: TProduct[] = products.filter(product => product.name.toLowerCase()===query.toLowerCase());
        console.log('Produtos encontrados:', productsByName)

           if (productsByName.length > 0){
              res.status(200).send(productsByName);
           }else{
              res.status(404).send ('Nenhum produto encontrado com o nome informado');
    }
    }else{
        res.status(200).send(products)
    }
    
} );

app.post('/products', (req:Request, res:Response)=>{
    const {id, name, price, description, imageUrl}: TProduct= req.body;

    const newProduct: TProduct ={
        id,
        name,
        price,
        description, 
        imageUrl
    }

    products.push(newProduct)
    res.status(201).send ('Novo produto cadastrado com sucesso')

})

app.delete('/products/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const indexToDelete = products.findIndex((product)=>product.id === id)

    if(indexToDelete >=0){
        products.splice(indexToDelete,1)
    }else{
        console.log("Não há itens para deletar")
    }

    res.status(200).send({message:"Produto apagado com sucesso"})
})

app.put ('/products/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const newName = req.body.name as string|undefined
    const newPrice = req.body.price as number|undefined
    const newDescription = req.body.description as string|undefined
    const newImageUrl = req.body.imageUrl as string|undefined

    const product = products.find((product)=>product.id === id)
      
    if (product) {
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;

        res.status(200).send({ message: "Produto atualizado com sucesso" });
    } else {
        res.status(404).send({ message: "Produto não encontrado" });
    }
});
