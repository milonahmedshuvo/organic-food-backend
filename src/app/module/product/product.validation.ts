import z from 'zod'


const createProductZodValidationSchema = z.object({
    body : z.object({
        name: z.string().min(1, 'name is required'),
        description: z.string().min(5, 'description must be at least 5 charector long'),
        price : z.number().min(0, "Price must be a positive number"),
        stock : z.number().int().min(0, "Stock must be a non-negative integer"),
        category : z.string().min(1, 'category is required'),
        // .url({message: "Invalid image URL" }),
        image : z.string(),
        currency : z.enum(["BDT", "USD"]).default("BDT") 
    })
})





export const productValidation = {
    createProductZodValidationSchema
}