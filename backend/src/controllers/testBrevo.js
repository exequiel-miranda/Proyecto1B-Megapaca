import Mailjet from "node-mailjet";
import { config } from "../../config.js";

const testEmailController = {};

const mailjet = Mailjet.apiConnect(
    config.mailjet.apiKey,
    config.mailjet.secretKey
);

testEmailController.sendEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const result = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: config.mailjet.fromEmail,
                            Name: config.mailjet.fromName
                        },
                        To: [
                            {
                                Email: email
                            }
                        ],
                        Subject: "Correo de pruebasss",
                        HTMLPart: `
                            <h2>Hola</h2>
                            <p>Este correo fue enviado usando la API de Mailjet.</p>
                        `
                    }
                ]
            });

        res.status(200).json({
            message: "Correo enviado correctamente",
            data: result.body
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error enviando correo",
            error: error.response?.body || error.message
        });

    }
};

export default testEmailController;