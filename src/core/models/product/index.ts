import { Schema, model } from 'mongoose'

export interface IProduct {
    user           : any,
    name           : string,
    previousValue  : number,
    discount       : number,
    currentValue   : number,
    category       : any,
    commerce       : any,
    finalDate      : Date,
    image          : string,
    status         : Boolean,
    createdAt      : Date,
	updatedAt      : Date,
}

const productSchema = new Schema<IProduct>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido']
    },
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    previousValue: {
        type: Number,
        required: [true, 'El valor anterior es requerido'],
        trim: true,
        min: [0, 'El valor anterior debe ser mayor a 0']
    },
    discount: {
        type: Number,
        required: [true, 'El descuento es requerido'],
        trim: true,
        min: [0, 'El descuento debe ser mayor a 0']
    },
    currentValue: {
        type: Number,
        required: [true, 'El valor actual es requerido'],
        trim: true,
        min: [0, 'El valor actual debe ser mayor a 0']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoría es requerida']
    },
    commerce: {
        type: Schema.Types.ObjectId,
        ref: 'Commerce',
        required: [true, 'El comercio es requerido']
    },
    finalDate: {
        type: Date,
        required: [true, 'La fecha final es requerida']
    },
    image: {
        type: String,
        required: [true, 'La imagen es requerida']
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
        type: Date,
        default: Date.now()
    },
})


export default model<IProduct>('Product', productSchema)