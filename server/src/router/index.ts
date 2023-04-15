import {Router, Response, Request, NextFunction} from 'express';
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


const router = Router();


router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/refresh', AuthController.refresh);

router.post('/profile', AuthMiddleware, ProfileController.getProfileInfo);
router.put('/profile', AuthMiddleware, ProfileController.updateProfileInfo);

router.get('/tasks', AuthMiddleware,  TaskController.list);
router.get('/tasks/:id', AuthMiddleware, TaskController.detail);
router.post('/tasks/add', AuthMiddleware, TaskController.add);
router.put('/tasks/:id', AuthMiddleware, TaskController.update);

router.get('/statuses',  TaskStatusController.list);

router.get('/users/list', UserController.list);

router.get('/underground', UndergroundController.list);
router.get('/posts', PostController.getPosts);
router.get('/skills', SkillController.getSkills);
router.get('/roles', RoleController.list);
router.get('/genders', GenderController.list);

router.get('/admin/users/:id', UserAdminController.getUserById);
router.put('/admin/users/:id', UserAdminController.updateUserById);
router.post('/admin/users/add', UserAdminController.createUser);

router.get('*', (req: Request, res: Response) => {
    throw ApiError.NotFound('Not Found');
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res);
});
export default router;
