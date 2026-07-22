import deliveryDriversModel from "../models/deliveryDrivers.js";

import { v2 as cloudinary } from "cloudinary";

//Array de funciones
const deliveryDriversController = {};

//SELECT
deliveryDriversController.getAllDrivers = async (req, res) => {
  try {
    const drivers = await deliveryDriversModel.find();
    return res.status(200).json(drivers);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
deliveryDriversController.insertDrivers = async (req, res) => {
  try {
    //#1- Solicito todos los datos a guardar
    const { name, phone, cars, isActive } = req.body;

    //#2- lleno el modelo con los datos
    const newDriver = new deliveryDriversModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
      cars,
      isActive,
    });

    //#3- Guardo en la base de datos
    await newDriver.save();

    return res.status(200).json({ message: "Delivery Driver Saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ELIMINAR
deliveryDriversController.deleteDriver = async (req, res) => {
  try {
    //Buscamos cual es el conductor de delivery a eliminar
    const driverFound = await deliveryDriversModel.findById(req.params.id);

    //Eliminar la imagen de Cloudinary
    await cloudinary.uploader.destroy(driverFound.public_id);

    //Eliminar de la base de datos
    const driverDeleted = await deliveryDriversModel.findByIdAndDelete(
      req.params.id,
    );

    if (!driverDeleted) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
deliveryDriversController.updateDriver = async (req, res) => {
  try {
    //#1- Solicito los nuevos datos
    const { name, phone, cars, isActive } = req.body;

    //Identifico que Driver voy a actualizar
    const driverFound = await deliveryDriversModel.findById(req.params.id);

    const updatedData = {
      name,
      phone,
      cars,
      isActive,
    };

    //Si viene una imagen
    if (req.file) {
      //Eliminamos la imagen anterior
      await cloudinary.uploader.destroy(driverFound.public_id);

      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    //Guardo todo lo actualizado en la base de datos
    await deliveryDriversModel.findByIdAndUpdate(
        req.params.id, 
        updatedData, 
        {new: true,}
    );

    return res.status(200).json({ message: "Driver updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deliveryDriversController