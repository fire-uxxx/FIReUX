// ------------------------------------------------------------------
// Price details (inspired by Stripe)
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
// Stock-tracking modes
// ------------------------------------------------------------------
export type StockType = 'finite' | 'infinite' | 'manual'

// ------------------------------------------------------------------
// Full Product model
// ------------------------------------------------------------------
export interface Product extends Sluggable {
  id: string
  slug: string
  name: string
  description: string
  content: string
  price: number // stored in cents
  currency: string
  image: string
  galleryImages: string[]
  active: boolean
  metadata?: Record<string, unknown>
  prices?: Price[]
  productType?: ProductType
  secondaryText?: string

  /**
   * How stock is managed:
   * - finite: use `stock` for exact count
   * - infinite: never runs out
   * - manual: you’ll toggle availability yourself
   */
  stockType: StockType

  /**
   * Quantity when in `finite` mode; ignored otherwise
   */
  stock: number

  // Auto-generated fields
  created_at: string
  updated_at: string
  appId: string
}

// ------------------------------------------------------------------
// Entry type: exactly what the user fills in
// ------------------------------------------------------------------
export type ProductEntry = Omit<
  Product,
  'created_at' | 'updated_at' | 'appId' | 'currency'
>
