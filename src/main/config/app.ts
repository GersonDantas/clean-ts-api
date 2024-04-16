import express from 'express'
import setupMiddlers from './middlewares'

const app = express()
setupMiddlers(app)
export default app
