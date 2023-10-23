
# Labecommerce API


Bem-vindo à documentação da Labecommerce API, uma API de exemplo para um sistema de e-commerce. Esta API permite gerenciar usuários e produtos. Use as informações abaixo para entender como usá-la.
## Endpoints Disponíveis

### Usuários (Users)

- `GET /users`: Retorna todos os usuários cadastrados.
- `GET /users/:id`: Retorna um usuário específico com base no ID.
- `POST /users`: Cria um novo usuário.
- `DELETE /users/:id`: Deleta um usuário existente com base no ID.

### Produtos (Products)

- `GET /products`: Retorna todos os produtos cadastrados.
- `GET /products/:id`: Retorna um produto específico com base no ID.
- `GET /products/search?q={name}`: Retorna uma lista filtrada de produtos com base no nome.
- `POST /products`: Cria um novo produto.
- `PUT /products/:id`: Edita um produto existente com base no ID.
- `DELETE /products/:id`: Deleta um produto existente com base no ID.

### Compras (Purchases)
- `GET /purchases`: Retorna todos os pedidos de compra.
- `GET /purchases/:id`: Retorna informações detalhadas sobre um pedido específico com base no ID.
- `POST /purchases`: Cria um novo pedido de compra.
- `DELETE /purchases/:id`: Deleta um pedido de compra existente com base no ID.

## Como Usar

### Requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

### Instalação

1. Clone este repositório

2. Navegue até o diretório do projeto

3. Instale as dependências:
    npm install

4. Inicie o servidor:
    npm start


### Erros e Mensagens

A API retorna mensagens de erro apropriadas para diferentes situações. Certifique-se de verificar as respostas da API para entender as mensagens de erro e os códigos de status.

## Documentação Postman

Para testar e explorar os endpoints da API, você pode importar a coleção do Postman disponível aqui:
    https://documenter.getpostman.com/view/28316428/2s9YJhvepq






