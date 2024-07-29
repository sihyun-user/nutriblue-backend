import express from 'express';
import multer from 'multer';

import * as userController from '../controllers/user';
import { isAuthenticated } from '../middlewares';
import {
  updateUserSchema,
  updatePasswordSchema,
  updateAvatarSchema,
  getCalendarDateSchema
} from '../schemas/user';

const userRouter = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

userRouter.get('/', userController.getUser);
userRouter.delete('/', userController.deleteUser);
userRouter.patch('/profile', updateUserSchema, userController.updateUser);
userRouter.patch('/password', updatePasswordSchema, userController.updateUserPassword);
userRouter.post('/avatar', updateAvatarSchema, userController.updateUserAvatar);
userRouter.post('/upload-image', upload.single('file'), userController.updateImage);
userRouter.get('/healthy-report', userController.getHealthyReportByDate);
userRouter.get('/analyze-results', userController.getAnalyzeResultsByDate);
userRouter.post('/calendar', getCalendarDateSchema, userController.getRecordForCalendar);

export default (router: express.Router) => {
  router.use('/user', isAuthenticated, userRouter);
};
