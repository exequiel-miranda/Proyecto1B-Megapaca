import express from "express";
import customerController from "../controllers/customerController.js";

//usamos Router() de la libreria express para
//definir los métodos HTTP a utilizar
const router = express.Router();

router.route("/")
    .get(customerController.getCustomer);

router.route("/:id")
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
