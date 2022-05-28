import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConn from '@core/infra/typeorm/index'

async function createUser() {
  const connection = await createConn('localhost')

  const id = uuidV4()
  const pwd = await bcrypt.hash('admin', 12)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
     VALUES('${id}', 'admin', 'admin@rentalx.com', '${pwd}', 'XXXX-XXX', 'true', 'now()')
     `
  )

  await connection.close()
}

createUser().then(() => console.log('User admin created!'))
