# KHABAR - 🍝 Meal Box & Delivery Website

KHABAR is a personalized meal planning and delivery platform designed to connect customers with meal providers seamlessly. Built using the **MERN stack** with **Next.js**, it offers a feature-rich experience for both customers and meal providers.

## 🚀 Technologies Used

### **Frontend Development**
- Next.js
- NextAuth
- Redux
- TypeScript

### **Backend Development**
- Node.js
- Express.js
- Mongoose
- TypeScript

## 🔑 Features

### 1️⃣ User Authentication
- Custom login system for customers and meal providers using email/phone number and password.
- Secure authentication using **JWT (JSON Web Tokens)**.
- Password hashing with **bcrypt** for enhanced security.

### 2️⃣ Customer & Meal Provider Dashboards
- **Customer Dashboard:** Select meal plans, track orders, and manage preferences.
- **Meal Provider Dashboard:** Manage meal menus, respond to customer orders, and track deliveries.

### 3️⃣ Meal Selection & Preferences
- Customers can **customize meal plans** based on dietary preferences (vegan, keto, gluten-free, etc.).
- Meal providers can **create and update meal menus**, specifying ingredients, portion sizes, and pricing.

### 4️⃣ Search & Match System
- Customers can search for meals based on **cuisine, dietary preferences, ratings, and availability**.
- Meal providers can view customer preferences and **prepare orders accordingly**.

## 📡 API Endpoints

### **Customers**
- `POST /customers/order` - Create a new meal order.
- `GET /customers/orders` - Retrieve all orders placed by the customer.
- `PUT /customers/profile` - Update customer profile.

### **Meal Providers**
- `POST /providers/menu` - Create or update meal menu.
- `GET /providers/orders` - Retrieve all customer orders.
- `PUT /providers/response` - Respond to customer orders.

---

## 💡 About the Project
KHABAR aims to bridge the gap between customers looking for healthy, customized meal plans and meal providers offering high-quality food options. Whether you're a busy professional or a health-conscious eater, KHABAR provides a hassle-free way to enjoy personalized meals delivered to your doorstep.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Junaeid11/Khabar-website
   cd khabar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Start the backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

---

## 👨‍💻 Contributing
Contributions are welcome! If you'd like to contribute to KHABAR, feel free to open an issue or submit a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.

---

### 📞 Contact
For any inquiries, reach out via **junaeidahmed979@gmail.com** or visit the [GitHub Repository](https://github.com/Junaeid11/Khabar-website).

---

### 📂 Project Structure
```plaintext
khabar/
│── frontend/        # Next.js + Redux + TypeScript (Client)
│── backend/         # Express + MongoDB + TypeScript (Server)
│── README.md        # Project documentation
```

---

## 🚀 Future Enhancements
- 📦 Order Tracking System  
- ⭐ Wishlist Feature  
- 📧 Email Notifications

