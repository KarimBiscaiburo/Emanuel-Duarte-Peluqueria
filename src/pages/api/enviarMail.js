import nodemailer from "nodemailer";

const enviarMail = async (req, res) => {
    const { motivo, direccionMail, asunto } = req.body;

    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "emanuelduarte.estilista@gmail.com",
            pass: process.env.GOOGLE_PASS
        }
    }

    const mensaje = {
        from: "emanuelduarte.estilista@gmail.com",
        to: direccionMail.email,
        subject: asunto,
        text: motivo
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    return res.json(info);
}

export default enviarMail;