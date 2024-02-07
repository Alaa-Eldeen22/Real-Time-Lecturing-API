const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const verificationSchema = Joi.object({
  verificationCode: Joi.string().length(6).required(),
  mail: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);
router.post(
  "/verify",
  // validator.body(verificationSchema),
  authControllers.controllers.postVerification
);

// // test route to verify if our middleware is working
// router.post("/verify", (req, res) => {
//   // console.log(req.body);
//   const { username, mail, password } = req.body;
//   res.status(201).json({
//     userDetails: {
//       mail: mail,
//       username: username,
//       _password: password,
//       test: "verified",
//     },
//   });

//   // return res.status(200).send(req.body);
// });

module.exports = router;
