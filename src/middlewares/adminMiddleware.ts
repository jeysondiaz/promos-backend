import { NextFunction, Request, Response } from 'express'

export const adminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    if(req.body.user.role !== 'Administrador') throw new Error('No tienes permisos para realizar esta acción')
    next()

  } catch(error:any) {
    res.status(401).json({
      error: error.message
    });
  }
};