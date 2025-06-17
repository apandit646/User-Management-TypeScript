import { Router } from 'express';
import { registerUser, loginUser, getAllUsers } from '../controls/UserControllers';

import { authenticateToken } from '../auth/auth';

const router: Router = Router();
// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', authenticateToken, getAllUsers);


// Export the router
export default router;



