# ShopAI – AI-Powered E-Commerce Platform

ShopAI is a full-stack e-commerce web application that combines online shopping features with an AI-powered shopping assistant to help users discover products.

## Features

- User registration and login with JWT authentication
- Product browsing and product details
- Shopping cart and wishlist management
- Order management
- Product reviews and ratings
- Admin dashboard for product management
- AI-powered shopping assistant using Google Gemini
- Product data management with MongoDB

## Tech Stack

**Frontend:** React, Vite, JavaScript, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** JSON Web Tokens (JWT), bcrypt

**AI Integration:** Google Gemini API

**Tools:** Git, GitHub, VS Code, Thunder Client

## Project Structure

```text
ShopAI-Ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── api/
├── .gitignore
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Evangeline22-web/ShopAI-Ecommerce.git
cd ShopAI-Ecommerce
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the required variables, using the names expected by your code:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your real environment variables or API keys.

Start the backend:

```bash
npm start
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Future Improvements

- Online payment integration
- Personalized product recommendations
- Production deployment
- Improved automated testing

## Author

Evangeline Anto Shaila A

GitHub: https://github.com/Evangeline22-web

## License

This project is available for learning and portfolio purposes. Add a suitable open-source license if you intend to grant broader reuse permissions.