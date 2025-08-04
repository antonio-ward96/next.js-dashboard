import mongoose from "mongoose";

// تعريف السكيما
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  phone: { type: String },
  address: { type: String }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  img: { type: String },
  color: { type: String },
  size: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", userSchema);
const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);

export { User, Product };