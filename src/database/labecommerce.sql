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
       ('u006', 'Beatriz', 'beatriz@email', 'beatriz123', datetime('now')),
       ('u007', 'Cristiane','cris@email.com','cris159', datetime('now'));


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

SELECT * FROM products 
WHERE name LIKE '%gamer%';
