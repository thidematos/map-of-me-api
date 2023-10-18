const mongoose = require('mongoose');
const validator = require('validator');
const isSegurePassword = require('./../utils/validatePassoword');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Um usuário precisa de um email!'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'O email não é válido',
    },
  },
  password: {
    type: String,
    required: [true, 'Um usuário precisa de uma senha!'],
    minlength: [8, 'A senha precisa de, no mínimo, 8 caracteres.'],
    validate: {
      validator: isSegurePassword,
      message: 'A senha não atende aos requisitos de segurança.',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Um usuário precisa de uma confirmação de senha'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'As senhas não coincidem!',
    },
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Um usuário precisa de um nome!'],
  },
  age: {
    type: Number,
    required: [true, 'Um usuário precisa de uma idade'],
  },
  initialComment: {
    type: String,
    required: [true, 'Um usuário precisa de um comentário inicial'],
    maxlength: [300, 'Um comentário deve conter até 300 caracteres.'],
  },

  levels: {
    mapOne: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapTwo: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapThree: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapFour: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapFive: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapSix: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapSeven: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
    mapEight: {
      completed: {
        type: Boolean,
        default: false,
      },
      focusTime: String,
      wrongMoves: String,
      durationToComplete: String,
      hints: String,
    },
  },
  feedbacks: {
    hasFeedbacks: {
      type: Boolean,
      default: false,
    },
    lastFeedback: Date,
    averageRating: Number,
    feedbacks: [
      {
        title: String,
        level: String,
        description: String,
        rating: {
          type: Number,
          max: 5,
          min: 1,
        },
        timeStamp: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  toWin: {
    mapOne: {
      type: Boolean,
      default: false,
    },
    mapTwo: {
      type: Boolean,
      default: false,
    },
    mapThree: {
      type: Boolean,
      default: false,
    },
    mapFour: {
      type: Boolean,
      default: false,
    },
    mapFive: {
      type: Boolean,
      default: false,
    },
    mapSix: {
      type: Boolean,
      default: false,
    },
    mapSeven: {
      type: Boolean,
      default: false,
    },
    mapEight: {
      type: Boolean,
      default: false,
    },
  },
  alreadyEnded: {
    type: Boolean,
    default: false,
  },
  alreadyBegin: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    default: 'user',
    select: false,
    enum: ['admin', 'user'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('feedbacks.feedbacks')) return next();

  this.feedbacks.lastFeedback = this.feedbacks.feedbacks.at(-1).timeStamp;

  const averageRating =
    this.feedbacks.feedbacks.reduce((sum, el) => sum + el.rating, 0) /
    this.feedbacks.feedbacks.length;

  this.feedbacks.averageRating = averageRating;
});

userSchema.post('save', function () {
  this.role = undefined;
  this.__v = undefined;
  this.password = undefined;
});

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
