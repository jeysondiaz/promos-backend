import { Schema, model } from 'mongoose'
import CryptoJS from 'crypto-js'
import validator from 'validator'
import { JWT_AUTH_SECRET } from '@envs/index'

export interface IUser {
    firstName: string,
    lastName : string,
    email    : string,
    password : string | undefined,
    status   : any,
    createdAt: Date,
	updatedAt: Date,
    role     : any,
    decryptPassword: (hashedPassword: string) => string;
}

export enum UserRoles {
	User = 'Usuario',
	Admin = 'Administrador',
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true,
        minlength: [3, 'El apellido debe tener al menos 3 caracteres']
    },
    email: {
        type: String,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'El email ingresado no es válido'
        },
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: Object.values(UserRoles),
            message: 'El rol debe ser alguno de los predeterminados por el sistema'
        },
        default: UserRoles.User
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false,
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await CryptoJS.AES.encrypt(this.password!, JWT_AUTH_SECRET()).toString()
    next()
})

/**
 *
 * @param hashedPassword
 * @return Decrypt hashed password
 */

UserSchema.methods.decryptPassword = async function (hashedPassword:string) {
    const passwordDecrypted = await CryptoJS.AES.decrypt(hashedPassword, JWT_AUTH_SECRET())
        .toString(CryptoJS.enc.Utf8)

    return passwordDecrypted
}

export default model<IUser>('User', UserSchema)