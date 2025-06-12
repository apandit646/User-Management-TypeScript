import { Router } from 'express';
import {registerUser}  from '../controls/UserControllers';
const router: Router = Router();
// User routes
router.post('/register', registerUser);
// router.post('/login', loginUser);
// Export the router
export default router;



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