# ShopAI – AI-Powered E-Commerce Platform

ShopAI is a full-stack e-commerce web application built using the MERN stack. It enables users to browse products, manage their shopping carts and wishlists, place orders, and receive AI-powered product recommendations.

## Features

- **User Authentication:** User registration and login with JWT authentication.
- **Product Management:** Browse products, view product details, and search for products.
- **Shopping Cart:** Add products, update quantities, and remove items.
- **Wishlist:** Save and manage favourite products.
- **Order Management:** Place orders, provide shipping addresses, and view order history.
- **Admin Dashboard:** Manage products with administrative access controls.
- **AI Shopping Assistant:** Get product suggestions based on user requests.
- **Responsive Interface:** Navigate the application through a React-based frontend.

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**AI Integration**
- Google Gemini API

## Project Structure

```text
ai-ecommerce/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── api/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB
- Google Gemini API key for AI functionality

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ai-ecommerce
```

Replace `YOUR_REPOSITORY_URL` with your actual repository URL.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
GEMINI_API_KEY=your_gemini_api_key
```

Use the actual variable names expected by your backend code. Never commit real API keys, database credentials, or JWT secrets.

Start the backend:

```bash
node server.js
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## Application Modules

1. Authentication and user management
2. Product browsing and search
3. Cart and wishlist management
4. Checkout and order history
5. Administrative product management
6. AI-powered product recommendations

## Future Enhancements

- Online payment gateway integration
- Product reviews and ratings
- Improved recommendation personalization
- Order tracking and notifications
- Deployment to a cloud hosting platform

## Learning Outcomes

This project demonstrates full-stack application development, REST API integration, database operations, authentication and authorization, frontend-backend communication, and integration of a generative AI API.

## Author

Developed as a full-stack web development project.
