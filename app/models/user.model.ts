// ~/models/user.model.ts

export interface User {
  id: string
  display_name: string
  handle: string
  avatar: string
  email: string
  created_at: string
  appIds: string[]
  adminAppIds?: string[]

  subscription?: {
    plan: 'standard' | 'pro'
    started_at: string
  } | null
  is_active?: boolean // Whether the user is currently active
  role?: 'user' | 'admin' | 'moderator' // Role of the user in the system
  login_count?: number // Total number of logins
  profile_completion?: number // Percentage of profile completion (0-100)
}
