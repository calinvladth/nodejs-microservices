import nodemailer from 'nodemailer';
import {config} from "../config";
import SMTPTransport from "nodemailer/lib/smtp-transport";


const transporter = nodemailer.createTransport({
    service: config.SMTP_SERVICE,
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
    },
} as SMTPTransport.Options);


async function signinEmail({email}: {email: string}) {
    await transporter.sendMail({
        from: `"Micro 👻" <${config.SMTP_USER}>`, // sender address
        to: email, // list of receivers
        subject: "Hola!", // Subject line
        text: "Sign in email", // plain text body
        html: "<b>Login <i>email</i></b>", // html body
    });
    console.log('SIGNIN mail sent successfully to ', email)
}

async function signupEmail({email}: {email: string}) {
    await transporter.sendMail({
        from: `"Micro 👻" <${config.SMTP_USER}>`, // sender address
        to: email, // list of receivers
        subject: "Hola!", // Subject line
        text: "Sign up email", // plain text body
        html: "<b style='color: rebeccapurple;'>Sign up <i>email</i></b>", // html body
    });
    console.log('SIGNUP mail sent successfully to ', email)
}

export const service = {
    signinEmail,
    signupEmail
}