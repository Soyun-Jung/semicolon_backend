import { adjectives, nouns } from "./words";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import mgTransport from "nodemailer-mailgun-transport";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

const sendEmail = (email) => {
    const options = {
        auth: {
            domain: process.env.MAILGUN_DOMAIN,
            apiKey: process.env.MAILGUN_APIKEY
        }
    }
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
}


export const sendSecretMail = (address, secret) => {
    const email = {
        from: "master@semicolon.com",
        to: address,
        subject: "Login Secret for Semicolon🔒",
        html:`Hello! Your login secret word is <Strong>'${secret}'</Strong>. <br/>Copy paste on the app/web 😊`    
    } 
    return sendEmail(email);
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}