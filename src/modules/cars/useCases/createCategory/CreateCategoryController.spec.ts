import 'reflect-metadata'

import bcrypt from 'bcrypt'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { Connection } from 'typeorm'

import { app } from '@core/infra/http/app'
import createConn from '@core/infra/typeorm'

let connection: Connection

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConn()
    await connection.runMigrations()

    const id = uuidV4()
    const pwd = await bcrypt.hash('admin', 12)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
     VALUES('${id}', 'admin', 'admin@rentalx.com', '${pwd}', 'XXXX-XXX', 'true', 'now()')
     `
    )
  })

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/session')
      .send({ email: 'admin@rentalx.com', password: 'admin' })

    const res = await request(app)
      .post('/categories')
      .send({ name: 'Valid name', description: 'Valid description' })
      .set({ Authorization: `Bearer ${responseToken.body.token}` })

    expect(res.status).toBe(201)
  })

  it('Should not be able to create a new category with existent name', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com', password: 'admin' })

    const res = await request(app)
      .post('/categories')
      .send({ name: 'Valid name', description: 'Valid description' })
      .set({ Authorization: `Bearer ${responseToken.body.token}` })

    expect(res.status).toBe(400)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
})
