import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import nodemailer from 'nodemailer';

const port = 3000;
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/public/html/index.html');
})

app.post('/',(req,res)=>{
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    const comment = req.body.message;

    /////////////////// Node Mailer /////////////////////

    const emailContent = `
    <h2><strong>Name:</strong> ${fName +" "+lName}</h2>
    <h3><strong>Email:</strong> ${email}</h3>
    <p><strong>Message:</strong> ${comment}</p>`;
  // Define email configuration
  let config = {
    service: "gmail",
    auth: {
      user: "newbooking45@gmail.com",
      pass: "dpqc hkev uupm kgjg",
    },
  };

  // Create transporter
  let transporter = nodemailer.createTransport(config);

  // Define email message
  let message = {
    from: "newbooking45@gmail.com",
    to: "haseebdar696@gmail.com",
    subject: "Portfolio Message",
    html: emailContent,
  };

  // Send email
  transporter
    .sendMail(message)
    .then((info) => {
      console.log("Email sent:", info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      res.status(500).json({ error: "Failed to send email" });
    });
    ////////////////////////////////////////////////////////////////////////

    res.redirect('/');
})

app.listen( port || process.env.PORT, () => {
    if(process.env.port){
        console.log('server running on port ' + process.env.PORT);
    } else {
        console.log('server is running on port ' + port);
    }
});