# BoiProkash Backend

A robust Node.js, Express, and MongoDB backend for the BoiProkash eCommerce bookstore.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Book Management**: Full CRUD operations for books, including search, pagination, and category filtering.
- **Order System**: Secure order processing with stock validation and status tracking.
- **Security**: Implements Helmet, CORS, and custom error handling.
- **Database**: MongoDB integration using Mongoose.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT)
- **Validation**: Joi (or similar validation logic)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chironjit598/BoiProkashBackend.git
   cd BoiProkashBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
   (See `.env.example` for all required variables)

### Running the App

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

- **Seed Database**:
  ```bash
  npm run seed
  ```

## API Endpoints

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/books` - Get all books (with search/pagination)
- `GET /api/v1/books/:id` - Get book details
- `POST /api/v1/orders` - Place a new order
- `GET /api/v1/orders/my-orders` - Get logged-in user's orders

## License

[MIT](LICENSE)
