const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { LINK_REGEX } = require('../utils/constants');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(LINK_REGEX),
  }),
}), updateAvatar);

module.exports = userRouter;
