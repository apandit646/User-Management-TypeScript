"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const ProjectControllers_1 = require("../controls/ProjectControllers");
const router = (0, express_1.Router)();
// Project routes
router.post('/regProject', auth_1.authenticateToken, ProjectControllers_1.createProject);
router.get('/getProjects', auth_1.authenticateToken, ProjectControllers_1.getAllProjects);
// router.post('/setprojEmployee', authenticateToken, setprojectMember);
// router.get('/deleteProject/:id', authenticateToken, deleteProject);
exports.default = router;
