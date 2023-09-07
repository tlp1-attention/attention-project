import { Users } from "../models/users";

/**
 * Modify Express' native Request interface to include
 * a compatible `user` property with the model.
 * The existence of such user is enforced with
 * passport authentication
 * 
 */
declare module 'express-serve-static-core' {
  interface Request {
    user?: Users
  }
}
