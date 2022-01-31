/* eslint-disable import/no-anonymous-default-export */
const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = JSON.parse(req.body)
   
    const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
    `

    const data = {
        to:'don@donbarto.com',
        from: 'donbartojunior@gmail.com',
        subject: `New message from ${body.name}`,
        text: message,
        html: message.replace(/\r\r/g, '<br />')
    }

    await mail.send(data)

    res.status(200).json({ status: 'OK' })
}