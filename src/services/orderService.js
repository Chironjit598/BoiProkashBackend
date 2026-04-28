import Order from '../models/Order.js';
import Book from '../models/Book.js';
import ApiError from '../utils/ApiError.js';

class OrderService {
  async createOrder(userId, orderData) {
    const { items, shippingAddress, paymentMethod, totalAmount } = orderData;

    if (!items || items.length === 0) {
      throw new ApiError('No order items provided', 400);
    }

    // Process items and validate stock
    for (const item of items) {
      const book = await Book.findById(item.product);
      if (!book) throw new ApiError(`Book not found: ${item.product}`, 404);
      if (book.stock < item.quantity) {
        throw new ApiError(`Insufficient stock for ${book.title}`, 400);
      }
      // Update stock
      book.stock -= item.quantity;
      await book.save();
    }

    const order = await Order.create({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    return order;
  }

  async getMyOrders(userId) {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate('items.product');
    return orders;
  }
}

export default new OrderService();
