import {Router, Response, Request} from 'express';
import {body} from 'express-validator';
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


const router = Router();

router.post('/auth/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthController.registration);
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
router.post('/users/add', UserController.add);

router.get('/underground', UndergroundController.list);
router.get('/posts', PostController.getPosts);
router.get('/skills', SkillController.getSkills);
router.get('/roles', RoleController.list);
router.get('/genders', GenderController.list);

router.get('/admin/users/:id', UserAdminController.getUserById);

router.get('*', (req: Request, res: Response) => res.sendStatus(404));

export default router;
