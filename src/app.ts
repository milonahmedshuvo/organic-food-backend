import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRouters } from './app/module/user/user.routes'
import config from './app/config'
import handleMongooseError from './app/error/handleMongooseError'
import { TError } from './app/error/errorType'
import AppError from './app/error/appError'
import { ZodError } from 'zod'
import handleZodError from './app/error/handleZodError'
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
app.use((err:any, req:Request, res:Response, next:NextFunction ) => {

    let statusCode = err.statusCode || 500
    let message = err.message || 'Something wrong'
    let error:TError = [
      {
        path: '',
        message: 'Something wrong'
      }
    ] 
  
  
  
    if(err.name === 'ValidationError'){
      const mongooseError = handleMongooseError(err)
      statusCode = mongooseError.statusCode
      message = mongooseError.message
      error = mongooseError.errorSource
    }else if(err instanceof ZodError){
      const zodError = handleZodError(err)
      statusCode = zodError.statusCode
      message = zodError.message
      error = zodError.errorSourse
    }else if(err instanceof AppError){
      statusCode = err.statusCode
      message = err.message
      error = [
        {
          path: '',
          message: err.message
        }
      ]
    }
  
  
  
  
    res.status(statusCode).json({
      success: 'false it golobar error',
      message: message,
      error,
      stack: config.node_env === 'development' ? err.stack : null
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