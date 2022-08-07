const express = require("express");
const { register } = require("../controller/user");
const { signin } = require("../controller/user");
const { signout } = require("../controller/user");
const {check} = require ('express-validator')
const router = express.Router();

router.post('/register', [
    check("name", "Name atleast should be 3 characters").isLength({min: 3}),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password at least should be 6 characters").isLength({min:6})
], register);

router.post('/signin', signin)

router.get('/signout', signout)
module.exports = router

