# 💻 Lap Shop App

A full-stack web application for managing laptops and customer orders, built with Angular (frontend) and Quarkus (backend).

This project was built for educational and portfolio purposes to practice full-stack development, REST APIs, and real-world data flow between frontend and backend.

---

## 🚀 Live Demo

👉 Frontend: https://lap-shop-mv.netlify.app  
👉 Backend API: https://lap-shop-app.onrender.com

## Note
> ⚠️❗The backend is hosted on Render's free tier, so the first request may take around 15–30 seconds because the server needs time to wake up from inactivity. 
After the initial wake-up, the application responds normally.
> 
---

## ✨ Features

- Display laptops from backend API
- Filter laptops by brand
- Create customer orders
- Display all orders with related laptop data
- Filter orders by customer and brand
- Sort orders by price (asc/desc)
- Edit existing orders
- Real-time UI updates after CRUD actions
- Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend

- Angular (Standalone Components)
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Forms (ngModel)

### Backend

- Java (Quarkus)
- Hibernate ORM (Panache)
- Quarkus REST
- H2 in-memory database

---

## 📦 Run Locally

### 1. Backend (Quarkus)

```bash
cd lap-shop-backend
./mvnw quarkus:dev
```

Backend runs on:

```text
http://localhost:8080
```

---

### 2. Frontend (Angular)

```bash
cd lap-shop-frontend/app
npm install
npx ng serve
```

Frontend runs on:

```text
http://localhost:4200
```

---

## ⚙️ How It Works

1. Frontend fetches laptops and orders via REST API.
2. Laptops are loaded from the database on application startup.
3. Users create orders by selecting a laptop and entering customer data.
4. Orders are persisted in the database.
5. Orders can be updated via PUT requests.
6. UI updates automatically after each operation.

---

## 📁 Project Structure

```text
mv-efd-selection-task/
├── lap-shop-backend/
│   ├── src/main/java/com/example/
│   │   ├── CreateShopOrderRequest.java
│   │   ├── Laptop.java
│   │   ├── LaptopDataLoader.java
│   │   ├── LaptopResource.java
│   │   ├── ShopOrder.java
│   │   ├── ShopOrderResource.java
│   │   ├── UpdateShopOrderRequest.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── import.sql
│   ├── Dockerfile
│   ├── pom.xml
│
├── lap-shop-frontend/
│   ├── app/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.component.html
│   │   │   │   ├── app.component.css
│   │   │   │   ├── services/
│   │   │   │   │   ├── laptops.service.ts
│   │   │   │   │   ├── orders.service.ts
│   │   │   ├── environments/
│   │   │   ├── main.ts
│   │   ├── angular.json
│   │   ├── package.json
```

---

## 📡 API Endpoints

### Laptops

- GET `/api/laptops`

### Orders

- GET `/api/orders`
- POST `/api/orders`
- PUT `/api/orders/{id}`

---

## 🧠 Backend Logic

- Laptops are stored as entities using Hibernate ORM.
- Orders are linked to laptops through a relational mapping.
- Initial laptop data is seeded on application startup.
- Order creation validates input and connects the selected laptop.

---

## 👤 Author

Martin Vukalović

---

## 📄 License

This project is intended for educational and portfolio purposes.
