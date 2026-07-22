import Brevo from "@getbrevo/brevo";
import { config } from "../../config.js";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    config.brevo.apiKey
);

export const sendEmail = async (to, subject, html) => {
    try {
        const email = new Brevo.SendSmtpEmail();

        email.sender = {
            email: config.EMAIL_FROM,
            name: "Mi Aplicación"
        };

        email.to = [
            {
                email: to
            }
        ];

        email.subject = subject;
        email.htmlContent = html;

        await apiInstance.sendTransacEmail(email);

        console.log("Correo enviado");
    } catch (error) {
        console.error(error);
    }
};