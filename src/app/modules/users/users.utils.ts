import { User } from './users.model'

// let lastUserId = 0;

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  console.log(lastUser)
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

  //incrementing id;
  console.log(currentId)
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  console.log(incrementId)

  return incrementId
  // return (0).toString().padStart(5,'0')
}
