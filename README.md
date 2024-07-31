# NODEJS expressjs prisma MYSQL (CRUP OPERATIONS + login and register)

there is no frontend in this code

here i do CRUD operations by using prisma using MYSQL database

i seperated two routers

opertations.js : is used to read upadate and delete
auth.js : login and register (register (create a new element)) and login ( to get the data and authenticate the informations )

dont judge about the name of the database i used my own previous database

and it has the client table

client table have :

name : varchar(255)
password: varchar(255)
email: varchar(255)
gender: varchar(255)
id: int autodecrement unique

and in prisma i used only the model of this table

i didnt use the jsonwebtoken (because its useless here)

Dont forget to do some changes in schema .prisma for your own useability and thanks

to run this you have only to type these command

1. npx prisma migrate dev --name client-table-init

2. npx prisma generate

3. npm install

4. npm run start
