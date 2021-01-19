import "./env";

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendEmail = (email) => {
    const option = {
        auth: {
            api_key: process.env.MAILGUN_APIKEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    };

    const client = nodemailer.createTransport(sgTransport(option));
    return client.sendMail(email, (err, info) => {
        if (err) {
            console.log(`Error:${err}`);
        } else {
            console.log(`Response:${info}`)
        }
    });
}

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "Semicolon",
        to: address,
        subject: "Login Secret for Semicolon🔒",
        html:`Hello! Your login secret word is <Strong>'${secret}'</Strong>. <br/>Copy paste on the app/web 😊`    
    } 

    return sendEmail(email);
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);