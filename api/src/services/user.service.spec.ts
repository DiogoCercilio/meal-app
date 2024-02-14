import { MockContext, Context, createMockContext } from '../../context'
import { prismaMock } from '../../singleton'
import BadRequestException from '../exception/badrequest.exception'
import UserService from './user.service'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})


test('should block user creation with missing parameters', async () => {
  const user = {
    name: 'Rich'
  }

  prismaMock.user.create.mockResolvedValue(user as any)

  const userService = new UserService()

  try {
    await userService.create(user as any)
  } catch(err) {
    expect(err).toBeInstanceOf(BadRequestException)
    expect(err).toHaveProperty('message', '"email" and "name" are required')
    expect(err).toHaveProperty('status', 400)
  } 
})

test('should create new user successfully', async () => {  
  const user = {
    id: 1,
    name: 'Rich',
    email: 'john@doe.com'
  }  

  prismaMock.user.create.mockResolvedValue(user)

  const userService = new UserService()
  await expect(userService.create(user)).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'john@doe.com'
  })
})