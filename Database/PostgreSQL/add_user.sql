 -- add user to 'users' table
INSERT INTO users (email) 
VALUES ('adriandominic.tan@wvsu.edu.ph');

-- return id of newly created user
SELECT id from users
WHERE email = 'adriandominic.tan@wvsu.edu.ph';