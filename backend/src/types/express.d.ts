import { IUser } from '../models/User';  // Import IUser, not the Mongoose model

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Extend the Request interface with the IUser property
    }
  }
}
