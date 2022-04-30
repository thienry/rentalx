import 'reflect-metadata'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import 'express-async-errors'

import { router } from './routes'
import swaggerFile from './swagger.json'
import { errorHandler } from './middlewares/errorHandler'

import './database'
import './shared/container'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)

app.use(errorHandler)

app.listen(5000, () => console.log('API has been started...'))
