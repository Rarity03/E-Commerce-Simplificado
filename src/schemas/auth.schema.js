import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }). min(3).max(255),

    email: z.string({
        required_error: 'Email must not be empty'
    }).email({
        message: 'Email is not valid'
    }),
    password: z.string({
        required_error: 'Password must not be empty'
    }).min(8, {
        message: 'Password must be at least 6 characters long'
    }).max(255),
    direction: z.string({
      required_error: 'Direction is required'
    }).max(255),
    phone: z.string({
      required_error: 'Phone is required'
    }).min(10).max(10)
})

export const loginSchema = z.object({
    email: z.string({
      required_error: 'Email must not be empty'
    }).email({
      message: 'Email is not valid'
    }),
    password: z.string({
      required_error: 'Password must not be empty'
    }).min(8, {
      message: 'Password must be at least 6 characters long'
    }).max(255)
  })

  export const updateSchema = z.object({
    name: z.string({
      required_error: 'Name is required'
    }). min(3).max(255).optional(),
    direction: z.string({
      required_error: 'Direction is required'
    }).max(255),
    phone: z.string({
      required_error: 'Phone is required'
    }).min(10).max(10)
  })