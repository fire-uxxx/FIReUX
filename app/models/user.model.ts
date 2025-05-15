// ~/models/user.model.ts

// Core user identity (global, never app-specific)
export interface CoreUser {
  id: string
  email: string
  created_at: string
  app_ids: string[] // Apps this user has joined
}
// App-specific user profile (e.g., for FIReUX)
export interface AppUserProfile {
  display_name: string
  handle: string
  avatar: string
  bio?: string
  created_at: string
  email: string
  role?: 'user' | 'admin'
  subscription?: {
    plan: 'standard' | 'pro'
    started_at: string
  } | null
}
