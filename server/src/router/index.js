const Router = require('express').Router;
const {body} = require('express-validator');
const userController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');


const router = new Router();

router.post('/user/registration',
    body('email').isEmail(),
    body('password').isLength({
        min: 3,
        max: 32,
    }),
    userController.registration
);
router.post('/user/login', userController.login);
router.post('/user/logout', userController.logout);
router.post('/user/refresh', userController.refresh);

router.get('/users', AuthMiddleware, userController.getUsers);


router.get('*', (req, res) => {
    return res.sendStatus(404);
});

module.exports = router
