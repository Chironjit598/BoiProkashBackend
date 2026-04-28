import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    cover: {
      type: String,
      required: [true, 'Cover image URL is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    pages: {
      type: Number,
    },
    language: {
      type: String,
      default: 'Bengali',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
bookSchema.index(
  { title: 'text', author: 'text', description: 'text' },
  { default_language: 'none', language_override: 'textSearchLanguage' }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
