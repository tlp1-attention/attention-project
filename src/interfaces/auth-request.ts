import type { Request } from 'express'
import type { Users as UsersType } from '../models/users'

export interface AuthRequest extends Request {
    user?: UsersType,
}