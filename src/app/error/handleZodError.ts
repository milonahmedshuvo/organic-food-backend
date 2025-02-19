import { ZodError } from "zod";
import { TError } from "./errorType";


const handleZodError = (err:ZodError) => {

    const errorSourse:TError = err.issues.map(val => {

        return {
            path: val.path[val.path.length -1],
            message: val.message
        }
    })

    const statusCode = 400

    return {
        statusCode,
        message: 'Zod Error',
        errorSourse
    }
}

export default handleZodError;