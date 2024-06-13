const z = require('zod');

const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password:z.string()
})

const updateuserSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

module.exports ={
    userSchema,
    updateuserSchema
}