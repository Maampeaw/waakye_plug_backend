
import nodemailer from 'nodemailer'


 const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    } 
}

const mailData = (message) => {
    return {
    "from": "Waakye Plug",
    "to": "mcgeniousgroupinc@gmail.com",
    "subject":"Order Receeived",
    "html": message
}
}

const transporter = nodemailer.createTransport(config);

 export const sendEmail = (message) => {
    transporter.sendMail(mailData(message), (err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info.response)
        }
    })
}