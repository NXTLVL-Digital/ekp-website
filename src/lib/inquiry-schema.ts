import { z } from 'zod'

export const inquirySchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().max(20).optional().or(z.literal('')),
    serviceType: z.enum(['senior', 'family', 'other'], {
      message: 'Please select a service type',
    }),
    gradYear: z.string().optional().or(z.literal('')),
    highSchool: z.string().optional().or(z.literal('')),
    message: z
      .string()
      .min(10, 'Please tell us a bit more about your dream session')
      .max(2000),
    website: z.string().max(0).optional(),
  })
  .refine(
    (data) => {
      if (data.serviceType === 'senior') {
        return data.gradYear && data.gradYear.trim().length > 0
      }
      return true
    },
    {
      message: 'Graduation year is required for senior sessions',
      path: ['gradYear'],
    }
  )
  .refine(
    (data) => {
      if (data.serviceType === 'senior') {
        return data.highSchool && data.highSchool.trim().length > 0
      }
      return true
    },
    {
      message: 'High school is required for senior sessions',
      path: ['highSchool'],
    }
  )

export type InquiryData = z.infer<typeof inquirySchema>
