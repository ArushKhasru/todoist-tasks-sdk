
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TodoistTasksSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TodoistTasksSDK.test()
    equal(testsdk instanceof TodoistTasksSDK, true,
      'TodoistTasksSDK.test() must return a client synchronously')
  })

})
