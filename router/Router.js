const express = require('express');
const accountController = require('../controllers/AccountsController');
const recoveryController = require('../controllers/RecoveryController')
const routescontroller = require('../controllers/RoutesController')
const rolescontroller = require('../controllers/RolesController')
const authenticateToken = require('../middlewares/TokenAuth')

const router = express.Router();

//route definitions
router.get("/", accountController.welcome)
.post("/register", accountController.register)
.post("/login", accountController.login)
.get("/logout", accountController.logout)
.post("/forgotpassword", recoveryController.forgotpassword)
.post("/verifytoken", recoveryController.verifytoken)
.post("/resetpassword", recoveryController.resetpassword)
.post("/addrole", rolescontroller.addRole)
.get("/users", authenticateToken, routescontroller.user)
.get("/admin", authenticateToken, routescontroller.admin)
.get("/staff", authenticateToken, routescontroller.staff)
.get("/managers", authenticateToken, routescontroller.managers)


module.exports = router;