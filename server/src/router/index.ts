import {Router, Response, Request} from 'express';
import {body} from 'express-validator';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import ProfileController from '../controllers/ProfileController.js';
import TaskController from '../controllers/TaskController.js';


const router = Router();

router.post('/user/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.registration);
router.post('/user/login', UserController.login);
router.post('/user/logout', UserController.logout);
router.get('/user/refresh', UserController.refresh);

router.post('/profile', AuthMiddleware, ProfileController.getProfileInfo);

router.get('/tasks', TaskController.list);
router.get('/tasks/:id', TaskController.detail);
router.post('/tasks/add', TaskController.add);
router.put('/tasks/:id', TaskController.update);


router.get('*', (req: Request, res: Response) => res.sendStatus(404));

export default router;
