import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Category from '../models/Category.js';

dotenv.config();

const sampleCategories = [
  { name: 'উপন্যাস', slug: 'fiction', icon: 'BookOpen', color: '#EF4444' },
  { name: 'বিজ্ঞান', slug: 'science', icon: 'FlaskConical', color: '#10B981' },
  { name: 'ইতিহাস', slug: 'history', icon: 'History', color: '#F59E0B' },
  { name: 'কবিতা', slug: 'poetry', icon: 'Feather', color: '#8B5CF6' },
  { name: 'থ্রিলার', slug: 'thriller', icon: 'Ghost', color: '#6366F1' },
  { name: 'শিশু-কিশোর', slug: 'kids', icon: 'Baby', color: '#EC4899' },
];

const sampleBooks = [
  {
    title: 'পথের পাঁচালী',
    author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
    price: 250,
    originalPrice: 300,
    cover: 'https://m.media-amazon.com/images/I/81xU+S-oNGL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'fiction',
    rating: 4.8,
    reviewCount: 125,
    description: 'বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ উপন্যাস।',
    isbn: '978-8170288824',
    publisher: 'মিত্র ও ঘোষ',
    pages: 320,
    language: 'Bengali',
    inStock: true,
    tags: ['classic', 'rural-life'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    title: 'ফেলুদা সমগ্র - ১',
    author: 'সত্যজিৎ রায়',
    price: 450,
    originalPrice: 500,
    cover: 'https://m.media-amazon.com/images/I/91tS28S7+pL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'thriller',
    rating: 4.9,
    reviewCount: 350,
    description: 'বিখ্যাত গোয়েন্দা ফেলুদার রোমাঞ্চকর গল্প।',
    isbn: '978-8172151034',
    publisher: 'আনন্দ পাবলিশার্স',
    pages: 600,
    language: 'Bengali',
    inStock: true,
    tags: ['detective', 'adventure'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    title: 'মহাজাগতিক কিউরেটর',
    author: 'হুমায়ূন আহমেদ',
    price: 180,
    originalPrice: 220,
    cover: 'https://m.media-amazon.com/images/I/41K-qYqV9lL.jpg',
    categorySlug: 'science',
    rating: 4.7,
    reviewCount: 85,
    description: 'অসাধারণ সায়েন্স ফিকশন গল্প।',
    isbn: '978-9844581457',
    publisher: 'অন্যপ্রকাশ',
    pages: 120,
    language: 'Bengali',
    inStock: true,
    tags: ['sci-fi', 'aliens'],
    isBestSeller: false,
    isFeatured: true,
  },
  {
    title: 'গীতাঞ্জলি',
    author: 'রবীন্দ্রনাথ ঠাকুর',
    price: 150,
    originalPrice: 180,
    cover: 'https://m.media-amazon.com/images/I/81XyLw2-0LL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'poetry',
    rating: 4.9,
    reviewCount: 210,
    description: 'নোবেল বিজয়ী কাব্যগ্রন্থ।',
    isbn: '978-8170281146',
    publisher: 'বিশ্বভারতী',
    pages: 160,
    language: 'Bengali',
    inStock: true,
    tags: ['spiritual', 'nobel'],
    isBestSeller: true,
    isFeatured: false,
  },
  {
    title: 'হিমুর হাতে কয়েকটি নীলপদ্ম',
    author: 'হুমায়ূন আহমেদ',
    price: 200,
    originalPrice: 240,
    cover: 'https://m.media-amazon.com/images/I/71R2B6S4pFL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'fiction',
    rating: 4.8,
    reviewCount: 190,
    description: 'হিমু সিরিজের একটি জনপ্রিয় উপন্যাস।',
    isbn: '978-9844581136',
    publisher: 'অন্যপ্রকাশ',
    pages: 110,
    language: 'Bengali',
    inStock: true,
    tags: ['himu', 'surreal'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    title: 'মিশরীয় রহস্য',
    author: 'সুনীল গঙ্গোপাধ্যায়',
    price: 320,
    originalPrice: 380,
    cover: 'https://m.media-amazon.com/images/I/81P5-G7XoSL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'thriller',
    rating: 4.6,
    reviewCount: 75,
    description: 'কাকাবাবু সিরিজের রোমাঞ্চকর অভিযান।',
    isbn: '978-8172153281',
    publisher: 'আনন্দ পাবলিশার্স',
    pages: 220,
    language: 'Bengali',
    inStock: true,
    tags: ['mystery', 'adventure'],
    isBestSeller: false,
    isFeatured: false,
  },
  {
    title: 'অসমাপ্ত আত্মজীবনী',
    author: 'শেখ মুজিবুর রহমান',
    price: 350,
    originalPrice: 400,
    cover: 'https://m.media-amazon.com/images/I/81U2fU1CqOL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'history',
    rating: 4.9,
    reviewCount: 500,
    description: 'বঙ্গবন্ধুর অমর স্মৃতিচারণ।',
    isbn: '978-9848120675',
    publisher: 'দি ইউনিভার্সিটি প্রেস লিমিটেড',
    pages: 329,
    language: 'Bengali',
    inStock: true,
    tags: ['biography', 'politics'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    title: 'লাল নীল দীপাবলি',
    author: 'হুমায়ুন আজাদ',
    price: 280,
    originalPrice: 320,
    cover: 'https://m.media-amazon.com/images/I/71Y86W-vNGL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'kids',
    rating: 4.8,
    reviewCount: 95,
    description: 'বাংলা সাহিত্যের ইতিহাস ছোটদের জন্য।',
    isbn: '978-9844101141',
    publisher: 'আগামী প্রকাশনী',
    pages: 140,
    language: 'Bengali',
    inStock: true,
    tags: ['history', 'literature'],
    isBestSeller: false,
    isFeatured: false,
  },
  {
    title: 'জোছনা ও জননীর গল্প',
    author: 'হুমায়ূন আহমেদ',
    price: 600,
    originalPrice: 700,
    cover: 'https://m.media-amazon.com/images/I/81A+S+fNfLL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'fiction',
    rating: 4.9,
    reviewCount: 420,
    description: 'মুক্তিযুদ্ধের পটভূমিতে রচিত মহাকাব্যিক উপন্যাস।',
    isbn: '978-9844584625',
    publisher: 'অন্যপ্রকাশ',
    pages: 500,
    language: 'Bengali',
    inStock: true,
    tags: ['war', 'liberation'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    title: 'মেঘনাদবধ কাব্য',
    author: 'মাইকেল মধুসূদন দত্ত',
    price: 220,
    originalPrice: 280,
    cover: 'https://m.media-amazon.com/images/I/71E+I-sO3DL._AC_UF1000,1000_QL80_.jpg',
    categorySlug: 'poetry',
    rating: 4.5,
    reviewCount: 60,
    description: 'বাংলা সাহিত্যের প্রথম মহাকাব্য।',
    isbn: '978-8170281146',
    publisher: 'মিত্র ও ঘোষ',
    pages: 250,
    language: 'Bengali',
    inStock: true,
    tags: ['classic', 'epic'],
    isBestSeller: false,
    isFeatured: false,
  },
  {
    title: 'পারুল ও আমি',
    author: 'হুমায়ূন আহমেদ',
    price: 150,
    originalPrice: 180,
    cover: 'https://m.media-amazon.com/images/I/51v8W2-v8LL.jpg',
    categorySlug: 'kids',
    rating: 4.7,
    reviewCount: 80,
    description: 'ছোটদের জন্য চমৎকার একটি বই।',
    isbn: '978-9844581136',
    publisher: 'অন্যপ্রকাশ',
    pages: 90,
    language: 'Bengali',
    inStock: true,
    tags: ['childhood', 'humor'],
    isBestSeller: false,
    isFeatured: false,
  },
  {
    title: 'বিলাসী',
    author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
    price: 100,
    originalPrice: 120,
    cover: 'https://m.media-amazon.com/images/I/71y86W-v8LL.jpg',
    categorySlug: 'fiction',
    rating: 4.6,
    reviewCount: 110,
    description: 'ছোটগল্পের অমূল্য সংকলন।',
    isbn: '978-8170281146',
    publisher: 'আনন্দ পাবলিশার্স',
    pages: 80,
    language: 'Bengali',
    inStock: true,
    tags: ['short-stories', 'social'],
    isBestSeller: false,
    isFeatured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await User.deleteMany({});
    await Book.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Admin
    const admin = await User.create({
      name: 'BoiProkash Admin',
      email: 'admin@boiprokash.com',
      password: 'admin123456',
      role: 'admin',
      phone: '01711223344',
      city: 'Dhaka',
      address: 'Banani, Dhaka',
    });
    console.log('👤 Admin created');

    // Create Categories
    const categories = await Category.insertMany(sampleCategories);
    console.log('📂 Categories created');

    // Create Books
    const booksToInsert = sampleBooks.map((book) => {
      const category = categories.find((c) => c.slug === book.categorySlug);
      const { categorySlug, ...bookData } = book;
      return { ...bookData, category: category._id };
    });

    await Book.insertMany(booksToInsert);
    console.log(`📚 ${booksToInsert.length} books seeded`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
