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


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result: TUser[] =await db.raw('SELECT * FROM users');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Ocorreu um erro ao buscar os usuários' });
    }
});

app.post('/users', async (req:Request, res:Response): Promise<void> => {
    try {
        const { id, name, email, password}:TUser = req.body;
        const existingUser = await db.raw('SELECT * FROM users WHERE id = ? OR email = ?', [id, email]);
        
        if (existingUser.length > 0) {
            res.status(400).send("O usuário com o ID ou e-mail informado já existe.");
            return;
        }
        if (typeof id !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).send('Os valores informados devem ser strings.');
            return;
        }
        if (!id.trim() || !email.trim() || !password.trim()) {
            res.status(400).send('Os valores informados não devem conter espaços vazios.');
            return;
        }
        if (typeof name !== 'string' || name.trim().length < 2) {
            res.status(400).send("O valor 'name' deve ser uma string com pelo menos dois caracteres.");
            return;
        }
        if (!email.includes('@')) {
            res.status(400).send('O e-mail informado é inválido.');
            return;
        }
        await db.raw('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, password]);

        res.status(201).send('Novo usuário cadastrado com sucesso.');
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

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
 
app.get('/products/search', async (req:Request, res:Response):Promise<void> => {
    try {
        const query: string = req.query.q as string;

        if (query) {
            const searchName: string = `%${query}%`;
            const productsByName: TProduct[] = await db.raw('SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?)', [searchName]);

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

app.post('/products', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, price, description, imageUrl }: TProduct = req.body;
        const existingProduct = await db.raw('SELECT * FROM products WHERE id = ?', [id]);

        if (existingProduct && existingProduct.length > 0) {
            
            res.status(400).send("O produto com o ID informado já existe.");
            return;
        }
        if (typeof id !== 'string' || !id.trim()) {
            
            res.status(400).send("O valor digitado para o 'id' deve ser uma string e não pode conter espaços vazios.");
            return;
        }
        if (typeof name !== 'string' || name.trim().length < 2) {
            res.status(400).send("O valor digitado para 'name' deve ser uma string, não pode conter espaços vazios e deve possuir mais de 2 caracteres.");
            return;
        }
        if (typeof price !== 'number' || price <= 0) {
            res.status(400).send("O valor digitado para o 'price' deve ser um número positivo.");
            return;
        }
        if (typeof description !== 'string') {
           
            res.status(400).send("O valor digitado para 'description' deve ser uma string.");
            return;
        }
        if (typeof imageUrl !== 'string') {
            res.status(400).send("O valor digitado para 'description' deve ser uma string.");
            return;
        }

        await db.raw('INSERT INTO products (id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)', [id, name, price, description, imageUrl]);

        res.status(201).send('Novo produto cadastrado com sucesso');
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

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
    
});

app.put('/products/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const { name, price, description, imageUrl } = req.body;

        const product = await db.raw('SELECT * FROM products WHERE id = ?', [id]);

        if (!product || product.length === 0) {
            res.status(404).send({ message: "Produto não encontrado." });
            return;
        }

        const updateParams = {
            name: name || product[0].name,
            price: price || product[0].price,
            description: description || product[0].description,
            image_url: imageUrl || product[0].image_url
        };

        await db.raw(
            `UPDATE products 
            SET name = ?, 
                price = ?, 
                description = ?, 
                image_url = ? 
                WHERE id = ?`,
            [updateParams.name, updateParams.price, updateParams.description, updateParams.image_url, id]
        );

        res.status(200).send({ message: "Produto atualizado com sucesso" });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: 'Houve um erro ao atualizar o produto' });
        }
    }
});

app.post('/purchases', async (req:Request, res:Response):Promise<void> => {
    try {
        const { id, buyer, products }= req.body;
        //verifica se ja existe um pedido com o mesmo ID
        const existingPurchase = await db.raw('SELECT * FROM purchases WHERE id = ?', [id]);
        if (existingPurchase.length > 0) {
            res.status(400).send("O pedido com o ID informado já existe.");
            return;
        }

        let total_price = 0;

        await db.raw('INSERT INTO purchases (id, buyer, total_price) VALUES (?, ?, ?)', [id, buyer, total_price]);
        //verifica se já existe um pedido com o mesmo id, caso não, insere o pedido na tabela
        for (const product of products) {
            const { id: productId, quantity } = product;
            await db.raw('INSERT INTO purchases_products (purchase_id, product_id, quantity) VALUES (?, ?, ?)', [id, productId, quantity]);
        }

        res.status(201).send({ message: "Pedido realizado com sucesso" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});

app.delete('/purchases/:id', async (req:Request, res:Response):Promise<void> => {
    try {
        const id:string = req.params.id;

        const existingPurchase = await db.raw('SELECT * FROM purchases WHERE id = ?', [id]);
        if (existingPurchase.length === 0) {
            res.status(404).send("Pedido não encontrado.");
            return;
        }

        await db.raw('DELETE FROM purchases WHERE id = ?', [id]);

        res.status(200).send({ message: "Pedido cancelado com sucesso" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message });
        }
    }
});
