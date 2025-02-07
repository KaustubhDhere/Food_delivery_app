# 🍕 Food Delivery Web App

## 🚀 Overview
A food ordering and delivery web application built with **Spring Boot (Java) & React.js (MUI)**. It integrates **RapidAPI** to fetch food data like **Pizzas, Chinese food, Cakes, Cocktails, and Mexican food** and uses **JWT authentication** for secure access.

## 🛠️ Technologies Used
- **Backend:** Spring Boot, PostgreSQL, Spring Security (JWT)
- **Frontend:** React.js, Material UI (MUI), Axios
- **API Integrations:** RapidAPI (for fetching food items)
- **Others:** CORS, JWT Authentication, REST APIs

## 📂 Project Structure

food-delivery-app/ │── backend/ # Spring Boot Backend │── frontend/ # React.js Frontend │── README.md # Documentation │── .gitignore # Ignore files


## ⚡ Getting Started
### 🔹 **Backend Setup**
```sh
cd backend
mvn spring-boot:run

or configure application.properties for database:

spring.datasource.url=jdbc:postgresql://localhost:5432/fooddb
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password

🔹 Frontend Setup
cd frontend
npm install
npm start

🌍 API Endpoints
Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Login and get JWT
GET	/categories/pizzas	Fetch Pizza list
GET	/categories/chinese	Fetch Chinese food
GET	/categories/cakes	Fetch Cakes
GET	/categories/cocktails	Fetch Cocktails

📜 License
This project is licensed under the MIT License.

🤝 Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit and push (git commit -m "New feature")
Open a Pull Request
