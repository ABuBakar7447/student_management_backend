import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import usersService from './app/modules/users/users.service'
import router from './app/modules/users/users.route'
const app: Application = express()
// const port = 3000

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', router)

//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('University management Service is running')
})

export default app
