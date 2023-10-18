const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const templates = require('./../public/templates');

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
