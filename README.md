Pokémon API 🏆
A Node.js + Express API for fetching, storing, and managing Pokémon data with features like pagination, search, and favorites. This API supports MySQL and includes Swagger API documentation.

🚀 Features
✅ Fetch Pokémon data from an external API and store it in a MySQL database.
✅ Retrieve Pokémon with pagination for efficient data handling.
✅ Search Pokémon by name or type.
✅ Filter and manage favorite Pokémon.
✅ Mark/unmark Pokémon as favorites via API.
✅ Swagger UI for easy API documentation and testing.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MySQL

ORM: Knex.js / Sequelize (Optional)

API Documentation: Swagger

Language: TypeScript

🚀 Getting Started
1️⃣ Install Dependencies
sh
Copy
Edit
npm install
2️⃣ Set Up Environment Variables
Create a .env file in the root directory and configure your database:

env
Copy
Edit
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-mysql-database
PORT=5001
3️⃣ Run Database Migrations (if using Knex.js)
sh
Copy
Edit
npm run migrate
4️⃣ Start the Development Server
sh
Copy
Edit
npm run dev
The server will run on:

arduino
Copy
Edit
http://localhost:5001
📜 API Documentation
You can explore and test the API via Swagger UI:

bash
Copy
Edit
http://localhost:5001/api-docs
For deployed environments:

bash
Copy
Edit
https://pokemon-api-sx3h.onrender.com/api-docs
