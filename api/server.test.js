const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[GET] /api/jokes', () => {
  it('returns a status 401. no token.', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  it('returns no data. no token.', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body).toMatchObject({
      "custom": "something went wrong in the api",
      "message": "token required"
    })
  })
})
describe('[POST] /api/auth/register', () => {
  it('returns a status 400. no username or password.', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.status).toBe(400)
  })
  it('returns error message. no username or password.', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.body).toMatchObject({
      "message": "username and password required"
    })
  })
})
describe('[POST] /api/auth/login', () => {
  it('returns a status 400. no username or password.', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.status).toBe(400)
  })
  it('returns error message. no username or password.', async () => {
    const res = await request(server).post('/api/auth/register')
    expect(res.body).toMatchObject({
      "message": "username and password required"
    })
  })
})