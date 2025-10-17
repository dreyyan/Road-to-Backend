# Prisma | Notes
## 1. Install Dependencies
```bash
npm install prisma --save-dev       # Install Prisma
npm install @prisma/client          # Install Prisma Client Library
npm install bcrypt                  # Install bcrypt (password hashing)
npm install jsonwebtoken            # Install JWT (user auth)
```

## 2. Prisma Setup:
```bash
npx prisma init                     # Initialize Prisma
npx prisma dev                      # Start local Prisma dev server
```

## 3. Edit schema.prisma:
```prisma
<!-- Remove `output` field in `generator client` -->
model User {
  id        Int       @id @default(autoincrement())
  name      String    
  email     String    @unique
  createdAt DateTime  @default(now())
}
```

## 4. Run Prisma Client & Server:
```bash
# Generate Prisma Client (after editing schema.prisma)
npx prisma generate
# Apply database migrations
npx prisma migrate dev --name init
# Open Prisma Studio (GUI)
npx prisma studio
```

## 5. Import Prisma Client in your express app:
```js
const { PrismaClient } = require('@prisma/client');
```

## 6. Add CRUD Operations:
```js
const users = await prisma.user.findMany(); // [GET]
const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
});                                         // [GET]
const newUser = await prisma.user.create({
    data: { name, email },
});                                         // [POST]
const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email },
});                                         // [PUT]
const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
});                                         // [DELETE]
```