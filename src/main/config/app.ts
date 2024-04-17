import express from 'express'
import setupMiddlers from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddlers(app)
setupRoutes(app)
export default app
