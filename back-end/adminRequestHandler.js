import bcrypt from "bcrypt";
import adminShema from "./model/admin.model.js";
import pkg from "jsonwebtoken";
import nodemailer from 'nodemailer'
import session from 'express-session'
const { sign } = pkg;
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "78793450c005b4",
    pass: "3f6797b4ee609e",
  },
});
// Admin Register
export function adminRegister(req, res) {
  console.log(req.body);
  const { username, email, phone, password, cpassword } = req.body;
  console.log(username, email, phone, password, cpassword);
  if (!(username && email && phone && password && cpassword))
    return res.status(400).send({ msg: "fields are empty" });
  if (password !== cpassword)
    return res.status(400).send({ msg: "passord not matched" });
  bcrypt
    .hash(password, 10)
    .then((hpassword) => {
      adminShema
        .create({ username, email, phone, password: hpassword ,OTP:""})
        .then(() => {
          return res.status(201).send({ msg: "Successfully registered!" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send(error);
        });
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
}

// Admin Login

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await adminShema.findOne({ email });
    const { username } = user;
    if (user == null) return res.status(500).send({ msg: "admin not found" });
    const success = await bcrypt.compare(password, user.password);
    if (success !== true)
      return res.status(401).send("Incorrect username or password");
    const token = await sign({ username }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).send({ msg: "successfully logedin", token });
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function adminHome(req,res){
  console.log(req.session);
res.status(200).send(req.user);
}


export async function emailVerification(req,res){
console.log(req.body);
const verify=await adminShema.findOne({email:req.body.email})

if(!verify)
  return res.status(401).send({msg:"Email is not available"})
// otp
const digits = '0123456789';
let OTP = '';
for (let i = 0; i < 6; i++) {
  OTP += digits[Math.floor(Math.random() * 10)];
}
const update=await adminShema.updateOne({email:req.body.email},{$set:{OTP:OTP}})
console.log(update);
  
  // const info = await transporter.sendMail({
  //   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
  //   to: `${req.body.email}`, // list of receivers
  //   subject: "Verification", // Subject line
  //   text: "Tour OTP", // plain text body
  //   html:`Your Otp is <b>${OTP}</b>`, // html body
  // });

  // console.log("Message sent: %s", info.messageId);





  res.status(200).send({msg:"OTP successfully send to your mail kindly check and verify"})
}