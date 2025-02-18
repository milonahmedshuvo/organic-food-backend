import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRouters } from './app/module/user/user.routes'
import config from './app/config'
const app = express()



// middleware 
app.use(express.json())
app.use(cors())

// application routes 
app.use('/api/v1/user', userRouters)



app.get('/', (req, res) => {
  res.send('Organic food server is runing..!')
})


// Global Error Handler in application 
app.use((err:any, req:Request, res:Response, next:NextFunction)=> {
    let statusCode = err.statusCode || 500
    let message = err.message || 'something is wrong'




    res.status(statusCode).json({
        status: "false",
        message: message,
        error: "",
        stack: config.node_env === 'development'? err.stack : null
    })
})


// Not Found Routes handler 
app.use((req:Request, res:Response, next:NextFunction) => {

    res.status(404).json({
        status: "false it global error",
        message: 'Route not found',
        error: ""
    })
})

export default app