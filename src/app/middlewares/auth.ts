import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/auth/auth.model';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Authorization token is required!',
      );
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    console.log('Decoded JWT:', decoded);

    const { userId } = decoded;

    // Check if user exists
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
    }

    // Attach user info to the request
    req.user = { id: user._id, role: user.role } as JwtPayload;

    next();
  });
};

export default auth;
