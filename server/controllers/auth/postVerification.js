const NewUser = require("../../models/newUser");
const User = require("../../models/user");
require('dotenv').config();

const postVerification = async (req, res) => {
    try {
        const { verificationCode, mail } = req.body;

        const userExists = await NewUser.findOne({ mail: mail.toLowerCase() });

        if (!userExists) {
            return res.status(409).send("Email must register before verification");
        }

        if (verificationCode === userExists.verificationCode) {
            // console.log('Identical');
            
            // Create verified user and save it in User document
            const user = await User.create({
                username: userExists.username,
                mail: userExists.mail,
                password: userExists.password
            });

            res.status(201).send({ message: 'Verified Successfully' });
        } else {
            return res.status(409).send("Your verification code is wrong");
        }
    } catch (err) {
        return res.status(500).send("Error occured. Please try again");
    }
};

module.exports = postVerification;