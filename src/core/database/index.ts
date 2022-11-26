/* eslint-disable no-console */
import { DB_USER, DB_PASS, DB_HOST, DB_NAME } from '@envs/index'
import { connect } from 'mongoose'

export const dbConnection = async () => {
    try {
        await connect(`mongodb+srv://${DB_USER()}:${DB_PASS()}@${DB_HOST()}/?retryWrites=true&w=majority`, {
            dbName: DB_NAME()
        })
        console.log('Database online')
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to database')
    }
}

