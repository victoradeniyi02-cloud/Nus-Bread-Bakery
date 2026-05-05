const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['bread', 'snacks'],
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  currency: {
    type: String,
    default: '₦'
  },
  originalPrice: Number,
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=NUS+BREAD'
  },
  images: [String],
  ingredients: [String],
  size: String,
  quantity: {
    type: Number,
    default: 1
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 100
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: mongoose.Schema.Types.ObjectId,
    comment: String,
    rating: Number,
    createdAt: Date
  }],
  bestseller: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
