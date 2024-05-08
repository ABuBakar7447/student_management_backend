import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  ///auto generated incremental id needed

  const id = await generateUserId()
  // console.log(id);
  user.id = id

  ///default password needed
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  return createdUser
}

export default {
  createUser,
}
