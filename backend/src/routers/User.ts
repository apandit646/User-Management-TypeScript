import { Router } from 'express';
import { registerUser, loginUser, getAllUsers } from '../controls/UserControllers';

import { authenticateToken } from '../auth/auth';
import { authorizeRoles } from '../auth/authorizeRoles';
import { TypeRole } from '../common/Usercommon';

const router: Router = Router();
// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', authenticateToken, authorizeRoles([TypeRole.MANAGER]), getAllUsers);


// Export the router
export default router;



