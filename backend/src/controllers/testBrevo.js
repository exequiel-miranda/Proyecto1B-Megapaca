import { config } from "../../config.js";

const testEmailController = {};

testEmailController.sendEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": config.brevo.apiKey
            },
            body: JSON.stringify({
                sender: {
                    name: "Mi API",
                    email: config.brevo.from
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: "Correo de prueba",
                htmlContent: `
                    <h2>Hola</h2>
                    <p>Este correo fue enviado usando la API de Brevo.</p>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json({
            message: "Correo enviado correctamente",
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error",
            error: error.message
        });

    }
};

export default testEmailController;