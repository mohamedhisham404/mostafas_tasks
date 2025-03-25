import Product from "../models/product.js";
import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";

const CreateOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;

        const order = await Order.create({ userId });

        if (items && items.length > 0) {
            for (const item of items) {
                const product = await Product.findByPk(item.productId);
                if (!product) {
                    return res
                        .status(400)
                        .json({
                            message: `Product ID ${item.productId} not found`,
                        });
                }
                await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
            }
        }else{
            return res
                .status(400)
                .json({
                    message: `Items are required`,
                });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const GetAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: OrderItem,
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const GetOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId, {
            include: OrderItem,
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const UpdateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.update(req.body);

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const DeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.destroy();

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { CreateOrder, GetAllOrders, GetOrderById, UpdateOrder, DeleteOrder };
