const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const templates = require('./../public/templates');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
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
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page, sort, limit, fields, ...queryObj } = req.query;

  let query = User.find();

  if (fields) {
    query = query.sort('-createdAt').select('createdAt age initialComment');
  }

  const users = await query;

  res.status(200).json({
    status: 'sucess',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'sucess',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //Req.body = { puzzleID, data: { completeTime, wrongMoves, focusTime, hints } }

  const currentUser = req.user;

  if (req.body.alreadyBegin) currentUser.alreadyBegin = true;
  else if (req.body.alreadyEnded) currentUser.alreadyEnded = true;
  else if (req.body.hasFeedback) {
    currentUser.feedbacks.hasFeedbacks = true;
    currentUser.feedbacks.feedbacks.push({
      title: req.body.title,
      level: req.body.level,
      description: req.body.description,
      rating: req.body.rating,
    });
  } else {
    const puzzleID = req.body.puzzleID;
    const { completeTime, wrongMoves, focusTime, hints } = req.body.data;

    currentUser.levels[puzzleID].completed = true;
    currentUser.levels[puzzleID].durationToComplete = completeTime;
    currentUser.levels[puzzleID].wrongMoves = wrongMoves;
    currentUser.levels[puzzleID].focusTime = focusTime;
    currentUser.levels[puzzleID].hints = hints;

    currentUser.toWin[puzzleID] = true;
  }

  const updatedUser = await currentUser.save({ validateModifiedOnly: true });

  req.user = updatedUser;

  res.status(200).json({
    status: 'sucess',
    data: {
      user: updatedUser,
    },
  });
});

exports.sendHTML = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      html: templates[req.params.dashboard],
    },
  });
});

exports.getUsersFeedbacks = catchAsync(async (req, res, next) => {
  let query = User.find({ 'feedbacks.hasFeedbacks': true })
    .select('_id feedbacks name age')
    .sort('-feedbacks.lastFeedback');

  const data = await query;

  res.status(200).json({
    status: 'sucess',
    results: data.length,
    data: {
      data,
    },
  });
});

exports.getLevelStatistics = catchAsync(async (req, res, next) => {
  const level = req.params.level;

  if (!level) return next(new AppError('Não foi encontrado essa fase!', 404));

  const statistics = await User.aggregate([
    {
      $match: { role: { $ne: 'admin' }, [`levels.${level}.completed`]: true },
    },
    {
      $group: {
        _id: null,

        avgDurationToComplete: { $avg: `$levels.${level}.durationToComplete` },
        maxDurationToComplete: { $max: `$levels.${level}.durationToComplete` },
        minDurationToComplete: { $min: `$levels.${level}.durationToComplete` },

        avgFocusTime: { $avg: `$levels.${level}.focusTime` },
        maxFocusTime: { $max: `$levels.${level}.focusTime` },
        minFocusTime: { $min: `$levels.${level}.focusTime` },

        avgHints: { $avg: `$levels.${level}.hints` },
        maxHints: { $max: `$levels.${level}.hints` },
        minHints: { $min: `$levels.${level}.hints` },

        avgWrongMoves: { $avg: `$levels.${level}.wrongMoves` },
        maxWrongMoves: { $max: `$levels.${level}.wrongMoves` },
        minWrongMoves: { $min: `$levels.${level}.wrongMoves` },

        numOfUsersData: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'sucess',
    data: {
      statistics,
    },
  });
});

exports.getMetricStatistics = catchAsync(async (req, res, next) => {
  const metric = req.params.metric;

  if (!metric)
    return next(new AppError('Essa métrica não foi encontrada!', 404));

  const metrics = await User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
      },
    },
    {
      $match: {
        [levels.mapOne.completed]: true,
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  res.status(200).json({
    status: 'sucess',
    data: {
      metrics,
    },
  });
});
