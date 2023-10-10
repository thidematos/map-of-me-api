const AppError = require('../utils/appError');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const createSignToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  user.password = undefined;

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: 'sucess',
    token,
    data: {
      user: user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    name: req.body.name,
    age: req.body.age,
    initialComment: req.body.initialComment,
  });

  res.status(201).json({
    status: 'sucess',
    data: {
      user: newUser,
    },
  });

  //createSignToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Por favor, informe um usuário e senha!', 400));

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password)))
    return next(
      new AppError(
        'Usuário ou senha incorretos! Por favor, tente novamente.',
        401
      )
    );

  createSignToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError(
        'Você não está autorizado a acessar esse conteúdo. Por favor, faça login!',
        401
      )
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Checking if the User still exists
  const currentUser = await User.findById(decoded.id).select('+role');
  if (!currentUser) next(new AppError('Seu usuário não existe mais!', 401));

  //Check if the User didn`t changed the password after the token was sent
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(
        'A senha foi alterada! Por favor, faça o login novamente',
        401
      )
    );

  req.user = currentUser;
  next();
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    console.log(roles, req.user.role);
    if (!roles.includes(req.user.role))
      return next(
        new AppError('Você não está autorizado a acessar essa route', 403)
      );
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(
      new AppError('Usuário não encontrado. Por favor, tente novamente', 404)
    );

  const resetToken = await user.createResetToken();
  await user.save({ validateBeforeSave: false });
});
