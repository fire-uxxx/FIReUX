export interface Price {
  id: string
  active: boolean
  billing_scheme: 'per_unit' | 'tiered'
  currency: string
  unit_amount: number
  type: 'one_time' | 'recurring'
  interval?: 'day' | 'week' | 'month' | 'year'
  intervalCount?: number
  metadata?: Record<string, unknown>
}

export interface StripeProduct {
  id: string
  name: string
  description: string
  image: string
  galleryImages: string[]
  active: boolean
  prices: Price[]
}

export type StripeProductInput = Omit<StripeProduct, 'id' | 'prices'> & {
  prices: Omit<Price, 'id' | 'active'>[] // Only fields needed to create a Stripe Price
}

export interface FirebaseProduct extends StripeProduct {
  appId: string
  slug: string
  createdAt: Date | string
  updatedAt: Date | string
  creatorId: string
  content: string
}
