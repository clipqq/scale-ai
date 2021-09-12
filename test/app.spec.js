const app = require('../src/app')

describe('app', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/slackstatus')
      .expect(200)
  })
})
