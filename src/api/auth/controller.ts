/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express'

// Models
import User, { UserRoles } from '@models/user'

// Error handling functions
import HttpException from '@errors/httpException'

// Utils
import { signToken } from '@utils/genJwt'


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = { ...req.body }
        const excludedField = UserRoles.Admin

        // Check if they put 'Admin' in the request.body
        if (Object.values(body).includes(excludedField)) {
            return next(
                new HttpException(
                    'No se puede crear usuarios administradores, intente nuevamente',
                    401
                )
            )
        }

        const newUser = await User.create(body)

        // Hide password from the output
        newUser.password = undefined

        res.status(200).json({
            status: true,
            message: 'Usuario registrado con éxito',
            user: newUser
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(
            new HttpException('Por favor ingresa el email y la contraseña!', 400)
        )
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password')

    if (!user || !((await user.decryptPassword(user.password!)) === password)) {
        return next(new HttpException('Email o contraseña incorrectos!', 401))
    }

    if (user.status === false) {
        return next(
            new HttpException(
                'Este usuario está inactivo. Contactar administrador',
                401
            )
        )
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id, user.role)

    res.status(200).json({
        status: true,
        message: 'Inicio de Sesión Exitoso',
        id: user._id,
        role: user.role,
        token
    })
}