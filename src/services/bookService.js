import Book from '../models/Book.js';
import Category from '../models/Category.js';
import ApiError from '../utils/ApiError.js';

class BookService {
  async getBooks(query) {
    const {
      category,
      minPrice,
      maxPrice,
      sort,
      search,
      page = 1,
      limit = 12,
    } = query;

    const filter = { isActive: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const skip = (page - 1) * limit;

    const books = await Book.find(filter)
      .populate('category')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);

    return {
      books,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getBookById(id) {
    const book = await Book.findById(id).populate('category');
    if (!book) throw new ApiError('Book not found', 404);

    const relatedBooks = await Book.find({
      category: book.category._id,
      _id: { $ne: book._id },
      isActive: true,
    })
      .limit(4)
      .populate('category');

    return { book, relatedBooks };
  }

  async getHomeData() {
    const heroBooks = await Book.find({ isActive: true, isFeatured: true })
      .limit(5)
      .populate('category');

    const bestSellers = await Book.find({
      isActive: true,
      rating: { $gte: 4.7 },
    })
      .sort({ rating: -1 })
      .limit(8)
      .populate('category');

    const newArrivals = await Book.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('category');

    return {
      heroBanner: heroBooks,
      bestSellers,
      newArrivals,
    };
  }

  async getCategoriesWithCount() {
    const categories = await Category.find();
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Book.countDocuments({ category: cat._id, isActive: true });
        return {
          ...cat.toObject(),
          bookCount: count,
        };
      })
    );

    return categoriesWithCount;
  }
}

export default new BookService();
