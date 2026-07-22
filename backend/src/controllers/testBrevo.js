import nodemailer from "nodemailer";
import { config } from "../../config.js";

const testEmailController = {};

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: config.brevo.smtpUser,
        pass: config.brevo.smtpKey
    }
});

testEmailController.sendEmail = async (req, res) => {
    try {

        const { email } = req.body;

        const info = await transporter.sendMail({
            from: `"Mi API" <${config.brevo.from}>`,
            to: email,
            subject: "Correo de prueba",
            html: `
                <h2>Hola</h2>

                <p>Este correo fue enviado usando <b>Brevo SMTP</b> con Nodemailer.</p>

                <b>Si recibiste este correo, la integración funciona correctamente.</b>
            `
        });

        res.status(200).json({
            message: "Correo enviado correctamente",
            messageId: info.messageId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error enviando correo",
            error: error.message
        });

    }
};

export default testEmailController;