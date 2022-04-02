CREATE TABLE users (
  id uuid NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  date_submitted date NOT NULL,
  date_modified date,
  price money NOT NULL,
  status varchar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id uuid NOT NULL,
  category varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  price money NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE carts (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  product_count int NOT NULL DEFAULT 0,
  price money NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE orders_products (
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  amount int NOT NULL,
  price money NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE carts_products (
  cart_id uuid NOT NULL,
  product_id uuid NOT NULL,
  amount int NOT NULL,
  price money NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (cart_id, product_id)
);
