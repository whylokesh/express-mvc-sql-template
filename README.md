Here’s the **README.md** file with all commands in plain text format that you can copy and paste directly:  

---

# **Raw MVC Backend Setup**  

This guide provides all the commands to set up a **Raw SQL + Express MVC Backend** with TypeScript.  

---

1. Create Project Directory & Initialize Node.js
mkdir raw-mvc-backend && cd raw-mvc-backend  
npm init -y  

2. Install Required Dependencies
npm install express dotenv cors body-parser morgan express-rate-limit helmet compression
npm install pg pg-pool  
npm install --save-dev typescript ts-node nodemon @types/node @types/express  

3. Initialize TypeScript
npx tsc --init  

4. Generate Folder Structure
mkdir -p src/{controllers,services,helpers,utils,routes,middlewares}  
mkdir -p database/{migrations,seeds,scripts}  
mkdir -p config public tests  
touch src/{server.ts, app.ts}  
touch config/db.ts  
touch src/controllers/{userController.ts,categoryController.ts,productController.ts}  
touch src/services/{userService.ts,categoryService.ts,productService.ts}  
touch src/routes/{index.ts,userRoutes.ts,categoryRoutes.ts,productRoutes.ts}  
touch database/migrations/001_create_tables.sql  
touch database/seeds/seed_users.sql  
touch database/scripts/migrate.ts  
touch database/scripts/seed.ts  
touch .env .gitignore README.md  

---

## **✅ Done!**  
This setup provides a well-organized **Raw SQL + Express MVC Backend** using TypeScript, without ORM overhead. 🚀