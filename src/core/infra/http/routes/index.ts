import { Router } from 'express'

import { carsRoutes } from '@core/infra/http/routes/cars.routes'
import { usersRoutes } from '@core/infra/http/routes/users.routes'
import { categoriesRoutes } from '@core/infra/http/routes/categories.routes'
import { authenticateRoutes } from '@core/infra/http/routes/authenticate.routes'
import { specificationsRoutes } from '@core/infra/http/routes/specifications.routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/cars', carsRoutes)
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)

export { router }
