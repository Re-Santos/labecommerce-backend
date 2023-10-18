-- Active: 1696996545156@@127.0.0.1@3306


CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at) 
VALUES ('u001', 'Fulano', 'fulano@email.com', 'fulano123',datetime('now')),
       ('u002', 'Beltrana', 'beltrana@email.com','beltrana00',datetime('now')),
       ('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99',datetime('now'));

INSERT INTO users 
VALUES ('u004', 'Amanda', 'amanda@email.com', 'amanda123', datetime('now')),
       ('u005', 'Jéssica', 'jessica@email.com', 'jessica123',datetime('now')),
       ('u006', 'Beatriz', 'beatriz@email', 'beatriz123', datetime('now'));
INSERT INTO users
VALUES ('u007', 'Cristiane','cris@email.com','cris159', datetime('now'));
       
DELETE FROM users 
WHERE id = 'u001';

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products(id, name, price, description, image_url)
VALUES ('prod001', 'Mouse gamer', 250, 'Melhor mouse do mercado','https://picsum.photos/seed/Mouse%20gamer/400'),
       ('prod002', 'SSD gamer',500, 'Acelere seu sistema com velocidades incríveis de leitura e gravação', 'https://images.unsplash.com/photo' ),
       ('prod003', 'Cadeira gamer',547.19, 'Cadeira ergonômica, reclinável, couro sintético','https://http2.mlstatic.com/D_NQ_NP_921709-MLB70326385749_072023-O.webp'),
       ('prod004', 'Teclado gamer',223, 'Teclado multimídia, mecânico, led','https://http2.mlstatic.com/D_NQ_NP_880113-MLB50584015972_072022-O.webp'),
       ('prod005', 'Monitor', 265, 'Monitor Firemax led 17 com Hdmi, vga','https://http2.mlstatic.com/D_NQ_NP_789192-MLB71931725165_092023-W.webp'),
       ('prod006','Mochila notebook', 89.73, 'Mochila impermeável para notebook, espaçosa, preta', 'https://http2.mlstatic.com/D_NQ_NP_824854-MLB70656406276_072023-W.webp');

INSERT INTO products
VALUES ('prod007','Fone de ouvido', 59.99, 'Fone headset business, ideal para quem trabalha ao longo do dia, alta qualidade de som', 'https://http2.mlstatic.com/D_NQ_NP_836340-MLB32003623445_082019-V.webp');

SELECT * FROM products 
WHERE name LIKE '%gamer%';
DELETE FROM products 
WHERE id = 'prod001';

UPDATE products
SET name = 'Mouse led',
    price= 29,
    description='Mouse recarregável Wireles, ergônomico',
    image_url='https://http2.mlstatic.com/D_NQ_NP_601758-MLB70301835457_072023-W.webp'
WHERE id ='prod003';

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    create_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

INSERT INTO purchases (id, buyer, total_price, create_at)
VALUES -- o user u001 foi deletado
       ('pedido002', 'u002', 500, datetime('now')),
       ('pedido003', 'u003', 400, datetime('now')),
       ('pedido004', 'u004', 300, datetime('now')),
       ('pedido005', 'u005', 600, datetime('now')),
       ('pedido006', 'u006', 450, datetime('now')),
       ('pedido007', 'u007', 350, datetime('now'));

SELECT * FROM purchases;

UPDATE purchases
SET total_price = total_price + 50
WHERE id = 'pedido002';

UPDATE purchases
SET total_price = total_price - 100
WHERE id = 'pedido007';

SELECT p.id AS purchase_id, 
       u.id AS user_id, 
       u.name AS user_name, 
       u.email AS user_email, 
       p.total_price, 
       p.create_at 
FROM purchases p 
JOIN users u 
ON p.buyer = u.id 
WHERE p.id = 'pedido002';

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS purchases_products;

SELECT * FROM purchases_products;


INSERT INTO purchases_products (purchase_id, product_id, quantity)
--pedido 1 e produto 2 não existem mais na tabela, por isso estava dando erro
VALUES 
       ('pedido002', 'prod002', 3),
       ('pedido003', 'prod003', 5),
       ('pedido004', 'prod004', 1),
       ('pedido005', 'prod005', 4),
       ('pedido006', 'prod006', 2);
--simula compra de clientes


SELECT * FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;