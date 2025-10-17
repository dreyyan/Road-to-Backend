# Prisma | Notes
```powershell
npm install @prisma/client          # Install Prisma Client Library
npx prisma dev                      # Start local Prisma dev server
npx prisma generate                 # Generate Prisma Client
npx prisma migrate dev --name init  # Apply database migrations
npx prisma studio                   # Open Prisma Studio (GUI)
```

Then, import in your express app:
```js
const { PrismaClient } = require('@prisma/client');
```