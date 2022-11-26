import { Schema, model } from 'mongoose'

export interface ICategory {
    description  : string,
    status       : any,
    createdAt    : Date,
	updatedAt    : Date,
}


const categorySchema = new Schema<ICategory>({
    description: {
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
        minlength: [3, 'La descripción debe tener al menos 3 caracteres']
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default model<ICategory>('Category', categorySchema)