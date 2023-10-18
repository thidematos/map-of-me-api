const express = require('express');
const userControllers = require('./../controller/userController');
const authControllers = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authControllers.signUp);
router.post('/login', authControllers.login);
router.post('/verifyAuth', authControllers.protect, authControllers.verifyAuth);
router.get(
  '/usersFeedbacks',
  authControllers.protect,
  authControllers.restrict('admin'),
  userControllers.getUsersFeedbacks
);

router.get(
  '/adminView/:dashboard?',
  authControllers.protect,
  authControllers.restrict('admin'),
  userControllers.sendHTML
);

router.post('/forgotPassword', authControllers.forgotPassword);

router
  .route('/')
  .post(userControllers.createUser)
  .get(
    authControllers.protect,
    authControllers.restrict('admin'),
    userControllers.getAllUsers
  );

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(authControllers.protect, userControllers.updateUser);

module.exports = router;
