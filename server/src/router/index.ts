import {Router, Response, Request} from 'express';
import {body} from 'express-validator';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import ProfileController from '../controllers/ProfileController.js';


const router = Router();

router.post('/user/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    UserController.registration);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/user/login', UserController.login);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/user/logout', UserController.logout);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/user/refresh', UserController.refresh);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/profile', AuthMiddleware, ProfileController.getProfileInfo);


router.get('*', (req: Request, res: Response) => res.sendStatus(404));

export default router;
