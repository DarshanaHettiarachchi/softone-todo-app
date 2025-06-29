## 📝 Project Setup Instructions

Thank you for taking the time to review this project. Below are the steps to help you get everything up and running smoothly.

---

## ⚙️ Backend (.NET API)

- **Startup Project:**  
  Please ensure the **API project** is selected as the default startup project in the solution.

- **Database Connection:**  
  The connection string is configured in `appsettings.Development.json`.  
  Please update it to match your local SQL Server setup if needed.

- **Database Setup Options:**  
  You can set up the database in either of the following ways:
  1. Run **Entity Framework Core migrations** to generate the schema.
  2. Use the included **SQL script** to manually create the database structure and seed data.

- **User Management:**  
  You can add users using the **`/register` API endpoint** or directly insert them using the provided SQL script.

- **Expected Port:**  
  The backend is expected to run on **http://localhost:7000**.

---

## 💻 Frontend (Angular)

- **Proxy Configuration:**  
  The frontend uses a proxy configuration file: `proxy.conf.json`  
  This allows API requests to be forwarded without hard-coding backend URLs.

- **Proxy Target:**  
  By default, the proxy forwards requests to:  
  `http://localhost:7000`

---

## 👤 Test Users

You may use the following test credentials for login **if you used sql script** in your database.  
If not, you can add them using the `/register` endpoint 

```json
{
  "email": "testuser1@todo.com",
  "password": "password"
}

{
  "email": "testuser2@todo.com",
  "password": "password"
}
```

Thank you again for reviewing this project!