const NewUser = require("../../models/newUser");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");

const postRegister = async (req, res) => {
  try {
    const userDetails = req.body;
    console.log("user register request came");

    // Search in the exist-verificated users.
    const userExists = await User.exists({
      mail: userDetails.mail.toLowerCase(),
    });

    if (userExists) {
      return res.status(409).send("E-mail already in use.");
    }

    const user = await updateUserOrCreateNew(userDetails);

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

const updateUserOrCreateNew = async (userDetails) => {
  const { username, mail, password } = userDetails;
  const verificationCode = sendVerificationEmail(mail);
  console.log(verificationCode);
  const encryptedPassword = await bcrypt.hash(password, 10);

  // Check if user exists based on email
  const user = await NewUser.findOne({ mail });

  if (user) {
    // User exists, update the desired field
    user.verificationCode = verificationCode;
    return await user.save();
  } else {
    // User doesn't exist, create a new one
    return await NewUser.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
      verificationCode: verificationCode,
    });
  }
};

function generateRandomNumberString() {
  const randomBuffer = crypto.randomBytes(3);
  const randomNumberString = randomBuffer.toString("hex").toUpperCase();
  return randomNumberString;
}

function sendVerificationEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
    port: 465,
  });

  const verificationCode = "111111" || generateRandomNumberString();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Real-time Lecturing email verification",
    html: `<div style="text-align: center;">
              <p>Your verification code is:</p>
              <h1 style="font-size: 2em; display: inline-block; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
                ${verificationCode}
              </h1>
            </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully");
    }
  });

  return verificationCode;
}

module.exports = postRegister;
