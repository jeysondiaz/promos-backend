/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'

import { JWT_AUTH_SECRET, JWT_EXPIRED_IN } from '@envs/index'

export const signToken = (id:any, role:string) => jwt.sign({ id, role }, JWT_AUTH_SECRET() as string, {
    expiresIn: JWT_EXPIRED_IN()
})
