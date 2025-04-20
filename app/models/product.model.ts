/**
 * Product interface representing a product in our system.
 * This model is inspired by Stripe's product structure.
 */
export interface Product extends Sluggable {
  id: string
  slug: string
  name: string
  description: string
  price: number // Price in cents
  currency: string
  image: string
  galleryImages: string[]
  active: boolean
  metadata?: Record<string, unknown>
  prices?: Price[]
  productType?: ProductType // Use the enum for product type
  secondaryText?: string
  stock: number // Number of items in stock
}

export interface Price {
  id: string
  active: boolean
  billing_scheme: string
  currency: string
  description?: string | null
  interval?: string | null
  interval_count?: number | null
  metadata?: Record<string, unknown>
  product: string
  recurring?: unknown
  tax_behavior: string
  tiers?: unknown
  tiers_mode?: string | null
  transform_quantity?: unknown
  trial_period_days?: number | null
  type: string
  unit_amount: number
}

export enum ProductType {
  Physical = 'physical',
  Digital = 'digital',
  Service = 'service'
}

export interface Subscription {
  id: string
  customer: string
  product: string
  price: Price
  status: 'active' | 'trialing' | 'canceled' | 'past_due' | 'unpaid' | string
  start_date: number
  current_period_start: number
  current_period_end: number
  trial_end?: number | null
  metadata?: Record<string, unknown>
}
