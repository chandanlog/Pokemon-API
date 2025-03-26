# **Pokémon API 🏆**  

A **Node.js + Express** API for fetching, storing, and managing Pokémon data with features like pagination, search, and favorites. This API supports **MySQL** and includes **Swagger API documentation** for easy testing.  

---

## 🚀 **Features**  

✅ Fetch Pokémon data from an external API and store it in a **MySQL** database.  
✅ Retrieve Pokémon with **pagination** for efficient data handling.  
✅ **Search Pokémon** by name or type.  
✅ **Filter and manage** favorite Pokémon.  
✅ **Mark/unmark Pokémon** as favorites via API.  
✅ **Swagger UI** for easy API documentation and testing.  

---

## 🛠️ **Tech Stack**  

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **ORM:** Knex.js / Sequelize (Optional)  
- **API Documentation:** Swagger  
- **Language:** TypeScript  

---

## 🚀 **Getting Started**  

### 1⃣ **Install Dependencies**  

```sh
npm install
```

### 2⃣ **Set Up Environment Variables**  

Create a **.env** file in the root directory and configure your database:  

```env
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-mysql-database
PORT=5001
```

### 3⃣ **Run Database Migrations (if using Knex.js)**  

```sh
npm run migrate
```

### 4⃣ **Start the Development Server**  

```sh
npm run dev
```

The server will be available at:  

```
http://localhost:5001
```

---

## 🐟 **API Documentation**  

You can explore and test the API using **Swagger UI**:  

### **Local Development**  
```
http://localhost:5001/api-docs
```

### **Deployed Environment**  
```
https://pokemon-api-sx3h.onrender.com/api-docs
```

---

## 🔥 **Contributing**  

Feel free to **fork** this repository, make changes, and submit **pull requests**!  

---

