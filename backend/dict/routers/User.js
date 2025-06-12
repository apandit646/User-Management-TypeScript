"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControllers_1 = require("../controls/UserControllers");
const router = (0, express_1.Router)();
// User routes
router.post('/register', UserControllers_1.registerUser);
// router.post('/login', loginUser);
// Export the router
exports.default = router;
// const express = require('express');
// const router = express.Router();
// const userControllers = require('../controllers/userControllers');
// // manger routes 
// router.post('/register', userControllers.registerUser);
// router.post('/login', userControllers.loginUser);
// // // Employee routes
// // router.post('/loginEmployee', employeeControllers.loginEmployee);
// // router.post('/registerEmployee', employeeControllers.registerEmployee);
// module.exports = router;
