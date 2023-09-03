import nodemailer from "nodemailer";

const enviarMail = async () => {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "emanuelduarte.estilista@gmail.com",
            pass: process.env.GOOGLE_PASS
            //kljuwgqiqqlxuljo
        }
    }

    const mensaje = {
        from: "emanuelduarte.estilista@gmail.com",
        to: "emanuelduarte.estilista@gmail.com",
        subjet: "Correo de prueba",
        text: "Envio"
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    console.log(info)
}

export default enviarMail;