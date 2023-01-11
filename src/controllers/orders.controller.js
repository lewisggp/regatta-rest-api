import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const { name, description, images, specifications, shape, weight, popularity, active, total } = req.body;

  try {
    const newOrder = new Order({
      name, 
      description, 
      images, 
      specifications, 
      shape, 
      weight, 
      popularity, 
      active, 
      total
    });

    /*if (specifications) {
      const s = ['mix', 'filling', 'cream', 'decoration'];
      for(var i = 0; i < s.length; i++) {        
        if(specifications[s[i]]) {
          for(var j = 0; j < specifications[s[i]].length; j++) {
            //const no = newOrder.populate('specifications.name');
            const p_id = specifications[s[i]]._id; // || (await Product.findOne({ name: specifications[s[i]][j]['name'] }))._id;
            newOrder.specifications[s[i]] = {
              "_id": p_id,
              "type": specifications[s[i]][j].type,
              "quantity": specifications[s[i]][j].quantity,
              "subtotal": specifications[s[i]][j].subtotal
            };
          }
        } else return res.status(500).json({"message": `${s[i]} empty`});
      }
    } else {
      return res.status(500).json({"message": "Specifications empty"});
    }*/

    const orderSaved = await newOrder.save();

    /*const c = await Order.findOne({_id: orderSaved._id}).populate({
      path: 'specifications.mix._id'
    });
    console.log(c.specifications.mix);*/

    res.status(201).json(orderSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  res.status(200).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find();
  return res.json(orders);
};

export const updateOrderById = async (req, res) => {
  const { name, description, products, type, total } = req.body;

  try {
    req.body.products = [];

    /*if (products) {
      for(var i = 0; i < products.length; i++) {
        const p = await Product.findOne({ name: { $in: products[i]['name'] } });
        req.body.products.push({
          "_id": p._id,
          "quantity": products[i].quantity,
          "subtotal": products[i].subtotal
        });
      }
    } else {
      return res.status(500).json({"message": "Products empty"});
    }*/

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      {
        new: true,
      }
    );

    res.status(204).json(updatedOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;

  await Order.findByIdAndDelete(orderId);

  // code 200 is ok too
  res.status(204).json();
};
