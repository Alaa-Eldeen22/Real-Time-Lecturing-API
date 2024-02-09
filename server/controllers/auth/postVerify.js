const newUser = require("../../models/newUser");
const NewUser = require("../../models/newUser");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const postVerify = async (req, res) => {
  try {
    const { verificationCode, mail } = req.body;

    const userExists = await NewUser.findOne({ mail: mail.toLowerCase() });

    if (!userExists) {
      return res.status(409).send("Email must register before verification");
    }
    if (verificationCode === userExists.verificationCode) {
      console.log("Identical");

      // Create verified user and save it in User document
      const user = await User.create({
        username: userExists.username,
        mail: userExists.mail,
        password: userExists.password,
      });
      // → Delete user from NewUser
      // await NewUser.findOneAndDelete({ mail: mail });
      // → Return token
      const token = jwt.sign(
        {
          userId: user._id,
          mail: user.mail,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "24h" }
      );
      console.log("no errors");
      res.status(201).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    } else {
      console.log("Verification Codes aren't identical");
      return res.status(409).send("Your verification code is wrong");
    }
  } catch (err) {
    return res.status(500).send("Error occured. Please try agaaaaain");
  }
};

module.exports = postVerify;
