import { Router } from 'express'

import { usersRoutes } from './users.routes'
import { categoriesRoutes } from './categories.routes'
import { authenticateRoutes } from './authenticate.routes'
import { specificationsRoutes } from './specifications.routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)

export { router }
