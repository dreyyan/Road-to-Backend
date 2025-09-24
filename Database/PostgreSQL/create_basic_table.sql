-- create table 'users'
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(150) UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users; -- display table