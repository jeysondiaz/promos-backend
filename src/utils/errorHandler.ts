/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpException from '@errors/httpException'


function ErrorHandler(err: httpException, req: Request, res: Response, next: NextFunction) {

    const status = err.status || 500
    const message = err.message || 'Something went wrong'

    return res.status(status).json({
        error: true,
        status,
        message
    })
}

export default ErrorHandler