/* global Promise */
import { Product, User } from "./models";
import { connectToDB } from "./utils";


export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchUsers = async (q = "", page = 1) => {
  const ITEM_PER_PAGE = 2;
  
  try {
    await connectToDB();
    
    const searchQuery = typeof q === 'string' ? q : '';
    const regex = new RegExp(searchQuery, "i");
    
    const currentPage = Math.max(1, parseInt(page) || 1);
    const skip = ITEM_PER_PAGE * (currentPage - 1);

    const [count, users] = await Promise.all([
      User.countDocuments({ username: { $regex: regex } }),
      User.find({ username: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(skip)
    ]);

    return { count, users };
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Failed to fetch users: " + err.message);
  }
};

export const fetchProducts = async (q = "", page = 1) => {
  const ITEM_PER_PAGE = 2;
  
  try {
    await connectToDB();
    
    const searchQuery = typeof q === 'string' ? q : '';
    const regex = new RegExp(searchQuery, "i");
    
    const currentPage = Math.max(1, parseInt(page) || 1);
    const skip = ITEM_PER_PAGE * (currentPage - 1);

    const [count, products] = await Promise.all([
      Product.countDocuments({ title: { $regex: regex } }),
      Product.find({ title: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(skip)
    ]);

    return { count, products };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Failed to fetch products: " + err.message);
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
