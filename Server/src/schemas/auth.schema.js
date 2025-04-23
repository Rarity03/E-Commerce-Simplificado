import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }). min(3, {
        message: 'Name must be at least 3 characters long'
    }).max(255, {
        message: 'Name must be at most 255 characters long'
    }),

    email: z.string({
        required_error: 'Email must not be empty'
    }).email({
        message: 'Email is not valid'
    }),

    password: z.string({
        required_error: 'Password must not be empty'
    }).min(6, {
        message: 'Password must be at least 6 characters long'
    }).max(255, {
        message: 'Password must be at most 255 characters long'
    }),

    direction: z.string({
      required_error: 'Direction is required'
    }).max(255),

    phone: z.string({
      required_error: 'Phone is required'
    }).min(10, {
      message: 'Phone must exist'
    }).max(10)
})

export const loginSchema = z.object({
    email: z.string({
      required_error: 'Email must not be empty'
    }).email({
      message: 'Email is not valid'
    }),
    password: z.string({
      required_error: 'Password must not be empty'
    }).min(6, {
      message: 'Password is not valid'
    }).max(255)
  })

  export const updateSchema = z.object({
    name: z.string({
      required_error: 'Name is required'
    }). min(3, {
      message: 'Name must be at least 3 characters long'
    }).max(255, {
      message: 'Name must be at most 255 characters long'
    }).optional(),

    email: z.string({
      required_error: 'Email must not be empty'
    }).email({
      message: 'Email is not valid'
    }),
    direction: z.string({
      required_error: 'Direction is required'
    }).min(1, {
      message: 'Direction must exist'
    }).max(255),
    phone: z.string({
      required_error: 'Phone is required'
    }).min(10, {
      message: 'Phone must exist'
    }).max(10)
  })