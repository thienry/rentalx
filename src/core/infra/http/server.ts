import { app } from '@core/infra/http/app'
import createConn from '@core/infra/typeorm'

createConn()
  .then(() => app.listen(5000, () => console.log('API has been started...')))
  .catch((err) => console.log(err.message))
