const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.post("/send-otp", userController.sendtOtp);

router.delete("/logout", userController.logout);

router.post("/verify-otp", userController.verifyOtp);

router.post("/forget-password", userController.forgetPassword);

router.put("/refreshToken", userController.refreshToken);

module.exports = router;
