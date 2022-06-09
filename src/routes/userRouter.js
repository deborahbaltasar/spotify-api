const express = require("express");

const authMiddleware = require("../app/middlewares/auth");
const UserController = require("../app/controllers/UserController");

const userRouter = express.Router();

userRouter.post('/', UserController.store);

userRouter.use(authMiddleware);

userRouter.get('/:id', UserController.show);

userRouter.get('/', UserController.index);

userRouter.delete('/:id', UserController.remove);

userRouter.put('/', UserController.update);

module.exports = userRouter;
