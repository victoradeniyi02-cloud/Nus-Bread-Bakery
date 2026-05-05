# 🍞 NUS BREAD - NATTY BAKER E-Commerce Website

## Overview
A professional, full-featured e-commerce website for NUS BREAD - NATTY BAKER, featuring:
- **Bread & Snacks Shop** with dynamic pricing (₦300-₦1,500)
- **Admin Dashboard** with editable prices and product variety
- **Order Management System** with multiple delivery options
- **User Authentication & Profiles**
- **Shopping Cart & Checkout**
- **Payment Integration** (Stripe, Bank Transfer, Cash on Delivery)
- **Bromate-Free Product Emphasis**

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs

### Frontend (To be built)
- **Framework**: React / Next.js
- **Styling**: Tailwind CSS / Bootstrap
- **State Management**: Context API / Redux
- **HTTP Client**: Axios

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/victoradeniyi02-cloud/nus-bread-bakery.git
   cd nus-bread-bakery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products?category=bread` - Filter by category
- `GET /api/products?search=keyword` - Search products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove/:productId` - Remove item from cart
- `POST /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

### Admin
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product (EDITABLE PRICES & DETAILS)
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/dashboard/stats` - Dashboard statistics

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Database Models

### User
- name, email, phone, password
- address (street, city, state, zipCode, country)
- role (customer/admin)
- timestamps

### Product
- name, description, category (bread/snacks)
- price, originalPrice
- image, images array
- ingredients array
- stock, inStock status
- rating, reviews array
- bestseller, featured flags
- timestamps

### Cart
- user reference
- items array (product, quantity, price)
- totalPrice, totalItems
- timestamps

### Order
- orderNumber (unique)
- user reference
- items array (product details, quantity, subtotal)
- shippingAddress
- subtotal, shippingFee, tax, totalAmount
- paymentMethod (card/transfer/cash_on_delivery)
- paymentStatus (pending/completed/failed)
- orderStatus (pending/confirmed/processing/ready_for_pickup/shipped/delivered/cancelled)
- deliveryType (pickup/delivery)
- deliveryDate, trackingNumber
- timestamps

## Features

### ✅ Implemented
- User registration & authentication
- Product catalog (breads & snacks)
- Shopping cart management
- Order creation & tracking
- Admin dashboard
- Editable pricing system
- Order status management
- Dashboard statistics

### 🔄 To Implement
- Payment gateway integration (Stripe, Paystack)
- Email notifications
- Product image uploads (Cloudinary)
- Advanced search & filtering
- Customer reviews & ratings
- Inventory management
- Delivery tracking
- Admin analytics

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/nus-bread-bakery
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
STRIPE_PUBLIC_KEY=your_key
CORS_ORIGIN=http://localhost:3000
```

## Testing

### Create Sample Products
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "White Bread Loaf",
    "description": "Fresh, bromate-free white bread",
    "category": "bread",
    "price": 500,
    "stock": 50,
    "ingredients": ["flour", "yeast", "salt", "water"],
    "image": "https://via.placeholder.com/300x300"
  }'
```

## Deployment

### Heroku
```bash
heroku login
heroku create nus-bread-bakery
git push heroku main
```

### Using Environment Variables on Heroku
```bash
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
```

## Support & Contact
- **Phone**: 09125836475
- **WhatsApp**: 07042668443
- **Email**: admin@nusbread.com

## License
MIT License - See LICENSE file

## Author
NUS BREAD - NATTY BAKER

---

**Happy Baking! 🍞**
