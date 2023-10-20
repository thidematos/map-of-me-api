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

  const metrics = {};

  metrics.mapOne = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapOne.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapOne`]: { $avg: `$levels.mapOne.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapTwo = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapTwo.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapTwo`]: { $avg: `$levels.mapTwo.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapThree = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapThree.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapThree`]: { $avg: `$levels.mapThree.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapFour = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapFour.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapFour`]: { $avg: `$levels.mapFour.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapFive = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapFive.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapFive`]: { $avg: `$levels.mapFive.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapSix = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapSix.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapSix`]: { $avg: `$levels.mapSix.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapSeven = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapSeven.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapSeven`]: { $avg: `$levels.mapSeven.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  metrics.mapEight = User.aggregate([
    {
      $match: {
        role: { $ne: 'admin' },
        'levels.mapEight.completed': true,
      },
    },
    {
      $group: {
        _id: null,
        [`avg${metric}MapEight`]: { $avg: `$levels.mapEight.${metric}` },
        numOfUsers: { $sum: 1 },
      },
    },
    //Eu quero que só os users que completaram o mapa possam partilhar dessa aggregation. Como farei?
  ]);

  let aggregatedResults = await Promise.all([
    metrics.mapOne,
    metrics.mapTwo,
    metrics.mapThree,
    metrics.mapFour,
    metrics.mapFive,
    metrics.mapSix,
    metrics.mapSeven,
    metrics.mapEight,
  ]);

  aggregatedResults = aggregatedResults.flatMap((result) => result);

  metrics.mapOne =
    aggregatedResults.find((el) => el.hasOwnProperty([`avg${metric}MapOne`])) ??
    'Nenhum explorador completou essa fase!';
  metrics.mapTwo =
    aggregatedResults.find((el) => el.hasOwnProperty([`avg${metric}MapTwo`])) ??
    'Nenhum explorador completou essa fase!';
  metrics.mapThree =
    aggregatedResults.find((el) =>
      el.hasOwnProperty([`avg${metric}MapThree`])
    ) ?? 'Nenhum explorador completou essa fase!';
  metrics.mapFour =
    aggregatedResults.find((el) =>
      el.hasOwnProperty([`avg${metric}MapFour`])
    ) ?? 'Nenhum explorador completou essa fase!';
  metrics.mapFive =
    aggregatedResults.find((el) =>
      el.hasOwnProperty([`avg${metric}MapFive`])
    ) ?? 'Nenhum explorador completou essa fase!';
  metrics.mapSix =
    aggregatedResults.find((el) => el.hasOwnProperty([`avg${metric}MapSix`])) ??
    'Nenhum explorador completou essa fase!';
  metrics.mapSeven =
    aggregatedResults.find((el) =>
      el.hasOwnProperty([`avg${metric}MapSeven`])
    ) ?? 'Nenhum explorador completou essa fase!';
  metrics.mapEight =
    aggregatedResults.find((el) =>
      el.hasOwnProperty([`avg${metric}MapEight`])
    ) ?? 'Nenhum explorador completou essa fase!';

  res.status(200).json({
    status: 'sucess',
    data: {
      metrics,
    },
  });
});

exports.getAgeStatistics = catchAsync(async (req, res, next) => {
  const [ageMin, ageMax] = req.params.age.split('-');
  console.log(ageMin, ageMax);

  if (!ageMin || !ageMax)
    return next(new AppError('Essa faixa etária não existe!', 404));

  const ages = {};

  const maps = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

  maps.forEach((map) => {
    ages[`map${map}`] = User.aggregate([
      {
        $match: {
          role: { $ne: 'admin' },
          age: { $gte: +ageMin, $lte: +ageMax },
          [`levels.map${map}.completed`]: true,
        },
      },
      {
        $group: {
          _id: null,
          avgDurationToComplete: {
            $avg: `$levels.map${map}.durationToComplete`,
          },
          avgFocusTime: { $avg: `$levels.map${map}.focusTime` },
          avgHints: { $avg: `$levels.map${map}.hints` },
          avgWrongMoves: { $avg: `$levels.map${map}.wrongMoves` },
          numOfUsers: { $sum: 1 },
        },
      },
    ]);
  });

  let results = await Promise.all(Object.values(ages));

  results = results.flatMap((result) => result);

  maps.forEach((map, ind) => {
    ages[`map${map}`] =
      results[ind] ||
      'Os jogadores dessa faixa etária ainda não completaram essa fase!';
  });

  res.status(200).json({
    status: 'sucess',
    data: {
      ages,
    },
  });
});
