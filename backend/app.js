import express from "express";
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import customerRoutes from "./src/routes/customer.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js";
import cookieParser from "cookie-parser";
import loginCustomerRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import cors from "cors";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providerRoutes from "./src/routes/provider.js";
import limiter from "./src/middlewares/limiter.js"
import cartRoutes from "./src/routes/cart.js"
import wompiRoutes from "./src/routes/wompi.js"
import deliveryDriverRoutes from "./src/routes/deliveryDrivers.js"
import {validateAuthCookie} from "./src/middlewares/authMiddleware.js"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./src/utils/luckyshop-megapaca-1.0-resolved.json" with {type: "json"}

import testEmailRoutes from "./src/routes/testEmail.js";
//Creo una constante que guarde Express
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    // permitir el envío de cookies y credenciales
    credentials: true,
  }),
);

app.use(limiter)

app.use(cookieParser());

//Que acepte los json desde postman
app.use(express.json());


//Documentación
app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use("/api/testEmail", testEmailRoutes);
app.use("/api/products", productRoutes);
app.use("/api/branches",  branchesRoutes);
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/loginCustomers", loginCustomerRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveryDrivers", deliveryDriverRoutes)

export default app;
