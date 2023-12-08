const express = require("express");

const router = express.Router();

const {login, signup} = require("../Controller/Controller")
const {uploadImage} = require("../Controller/Uploadcontroller")


router.post("/MiniSignup", signup);
router.post("/Minilogin", login);
// router.post("/registerprop", uploadImage);



module.exports = router;