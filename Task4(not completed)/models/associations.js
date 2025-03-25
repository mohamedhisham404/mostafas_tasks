import User from "./user";
import Category from "./category";
import Product from "./product";
import Order from "./order";
import OrderItem from "./orderItem";

Product.belongsToMany(Category, { through: "ProductCategories", as: "Categories" });
Category.belongsToMany(Product, { through: "ProductCategories", as: "Products" });

// One-to-Many: Order has multiple OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// One-to-Many: Product has multiple OrderItems
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

