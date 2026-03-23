//Creamos un array de funciones
const employeeController = {};

//import el Schema de la colección que voy a utilizar
import employeesModel from "../models/employees.js";

//Select
employeeController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees);
};

//Insert
employeeController.insertEmployee = async (req, res) => {
    //#1- Solicito los datos
    const{name, lastName, salary, DUI, phone, email, password, idBranches} = req.body;

    //#2- Lleno mi modelo con los datos que acabo de pedir
    const newEmployee = new employeesModel({
        name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranches
    });

    //#3- Guardo todo en la base de datos
    await newEmployee.save();

    res.json({message: "Employee save"})
}

//Eliminar
employeeController.deleteEmployee = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee deleted"})
}

//Actualizar
employeeController.updateEmployee = async (req, res) =>{
    ///#1- Solicito los nuevos datos
    const{name, lastName, salary, DUI, phone, email, password, idBranches} = req.body;
        //#2 Actualizo
        await employeesModel.findByIdAndUpdate(
            req.params.id,{
                name,
                lastName,
                salary,
                DUI,
                phone,
                email,
                password,
                idBranches
            },
            { new: true }
        );
    
        res.json({message: "Branch updated"})

}

export default employeeController;