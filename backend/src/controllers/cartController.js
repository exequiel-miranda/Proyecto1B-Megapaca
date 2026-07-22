import cartModel from "../models/cart.js";
import productsModel from "../models/products.js";

//Array de funciones
const cartController = {};

//SELECT
cartController.getCarts = async (req, res) => {
  try {
    const carts = await cartModel
      .find()
      .populate("customerId", "name email")
      .populate("products.productId", "name price");

    return res.status(200).json(carts);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//SELECT by id
cartController.getCartById = async (req, res) => {
  try {
    const cart = await cartModel
      .findById(req.params.id)
      .populate("customerId", "name email")
      .populate("products.productId", "name");

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
cartController.insertCart = async (req, res) => {
  try {
    //#1- Solicito los datos
    const { customerId, products, status } = req.body;

    //Variable para guardar el total
    let total = 0;

    //Nuevo arreglo de productos
    let newProducts = [];

    //De todos los productos que me envíe el frontend
    //los voy a recorrer uno por uno
    for (let i = 0; i < products.length; i++) {
      //Buscar el producto en la base de datos
      const productFound = await productsModel.findById(products[i].productId);

      //Calcular el subtotal
      const subtotal = productFound.price * products[i].quantity;

      //Sumar el total
      total += subtotal;

      //Guardamos el producto junto con su subtotal
      newProducts.push({
        productId: products[i].productId,
        quantity: products[i].quantity,
        subtotal: subtotal,
      });
    }

    //llenamos el modelo
    const newCart = new cartModel({
      customerId,
      products: newProducts,
      total,
      status,
    });

    //Guradamos todo en la base de datos
    await newCart.save();

    return res.status(200).json({ message: "Cart created" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
cartController.updateCart = async (req, res) => {
  try {
    //#1- Solicitamos los nuevos datos
    const { customerId, products, status } = req.body;

    //variable total
    let total = 0;

    //Arreglo de productos
    let newProducts = [];

    //Recorrer los productos
    for (let i = 0; i < products.legth; i++) {
      //Buscar producto
      const productFound = await productsModel.findById(products[i].productId);

      //Calcular el subtotal
      const subtotal = productFound.price * products[i].quantity;

      //Suma total
      total += subtotal;

      // Agregamos el producto al arreglo
      newProducts.push({
        productId: products[i].productId,
        quantity: products[i].quantity,
        subtotal: subtotal,
      });
    }

    //Actualizo el carrito en la base de datos
    const updatedCart = await cartModel.findByIdAndUpdate(
      req.params.id,
      {
        customerId,
        products: newProducts,
        total,
        status,
      },
      { new: true },
    );

    return res.status(200).json({ message: "cart updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ELIMINAR
cartController.deleteCart = async (req, res) => {
  try {
    const deletedCart = await cartModel.findByIdAndDelete(req.params.id);

    //validacion
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default cartController;
