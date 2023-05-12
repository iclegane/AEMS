import { Router, Response, Request, NextFunction } from 'express';
import PDFController from '../controllers/PDFController.js';
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import ProfileController from '../controllers/ProfileController.js';
import TaskController from '../controllers/TaskController.js';
import TaskStatusController from '../controllers/TaskStatusController.js';
import UndergroundController from '../controllers/UndergroundController.js';
import PostController from '../controllers/PostController.js';
import SkillController from '../controllers/SkillController.js';
import RoleController from '../controllers/RoleController.js';
import GenderController from '../controllers/GenderController.js';
import UserAdminController from '../controllers/UserAdminController.js';
import ApiError from '../exceptions/ApiError.js';
import errorMiddleware from '../middlewares/ErrorMiddleware.js';
import VacationController from '../controllers/VacationController.js';


const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/refresh', AuthController.refresh);

router.post('/profile', AuthMiddleware, ProfileController.getProfileInfo);
router.put('/profile', AuthMiddleware, ProfileController.updateProfileInfo);

router.get('/tasks', AuthMiddleware,  TaskController.list);
router.get('/tasks/:id', AuthMiddleware, TaskController.detail);
router.put('/tasks/:id', AuthMiddleware, TaskController.update);

router.post('/vacation/create',AuthMiddleware, VacationController.create);

router.get('/pdf/:name', PDFController.getFile);

router.get('/statuses',  TaskStatusController.list);
router.get('/underground', UndergroundController.list);
router.get('/posts', PostController.getPosts);
router.get('/skills', SkillController.getSkills);
router.get('/roles', RoleController.list);
router.get('/genders', GenderController.list);

router.get('/admin/users/list',AuthMiddleware, UserController.list);
router.get('/admin/users/:id',AuthMiddleware, UserAdminController.getUserById);
router.put('/admin/users/:id',AuthMiddleware, UserAdminController.updateUserById);
router.post('/admin/users/add',AuthMiddleware, UserAdminController.createUser);
router.post('/admin/tasks/add',AuthMiddleware, TaskController.add);


router.get('*', (req: Request, res: Response) => {
    throw ApiError.NotFound('Not Found');
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res);
});
export default router;
