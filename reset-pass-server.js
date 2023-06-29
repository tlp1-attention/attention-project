const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
require("dotenv").config();

const nodemailer = require("nodemailer");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());

async function sendMail(mail) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "negativegame117@gmail.com",
      pass: process.env.PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "negativegame117@gmail.com", // sender address
    to: mail, // list of receivers
    subject: "Enlace de recuperación de contraseña", // Subject line
    text: "Este es un mensaje con el cual recibiras un enlace para actualizar tu contraseña", // plain text body
    html: "<b>Este es un mensaje con el cual recibiras un enlace para actualizar tu contraseña</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  return "Email enviado con exito";
}

app.post("/resetPassword", async (req, res) => {
  try {
    const { email } = req.body;
    const sendedEmail = await sendMail(email);
    res.status(201).send(sendedEmail);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log(`app listen in port 3000`);
});
