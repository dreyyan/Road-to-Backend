# PostgreSQL: Operations
## DATABASES
```postgresql
\l                                  -- list all databases
CREATE DATABASE {DATABASE_NAME};    -- make a new database
DROP DATABASE {DATABASE_NAME}       -- drop (delete) database
\c mydb                             -- connect to mydb
```

## TABLES
```postgresql
SELECT * FROM {TABLE_NAME}      -- display table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,      -- auto-incrementing ID
    name VARCHAR(100),          -- text up to 100 chars
    email VARCHAR(150) UNIQUE   -- must be unique
);
```

## INSERT DATA
```postgresql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');
```

## QUERY DATA
```postgresql
SELECT * FROM users;              -- see everything
SELECT name FROM users;           -- only show names
SELECT * FROM users WHERE id=1;   -- filter
```

## UPDATE & DELETE
```postgresql
UPDATE users SET email='alice@new.com' WHERE id=1;
DELETE FROM users WHERE id=2;
```

## USER MANAGEMENT
```postgresql
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

## EXIT
```postgresql
\q
```