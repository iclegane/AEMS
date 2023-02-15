const {Router} = require('express');
const {body} = require('express-validator');
const userController = require('../controllers/UserController');
const profileController = require('../controllers/ProfileController');
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
router.get('/user/refresh', userController.refresh);

// router.post('/user/:id', userController.getUserInfo);
// router.put('/user/:id/edit', userController.updateUserInfo);
// router.get('/users', AuthMiddleware, userController.getUsers);


router.post('/profile', AuthMiddleware, profileController.getProfileInfo);


router.get('*', (req, res) => {
    return res.sendStatus(404);
});

module.exports = router;
