const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express'
import { JWT_AUTH_SECRET } from '@envs/index'
import  UserModel from '@models/user'

export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    const decodedToken = jwt.verify(token, JWT_AUTH_SECRET())
    const verifyUser = await UserModel.findById(decodedToken.id)
    if (!verifyUser) throw 'Usuario no encontrado'
    req.body.user = verifyUser
    next()

  } catch {
    res.status(401).json({
      error: 'usuario no autorizado'
    });
  }
};