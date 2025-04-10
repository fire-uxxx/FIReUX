// ~/models/user.model.ts
export interface User {
  id: string
  display_name: string
  handle: string
  avatar: string
  email: string
  created_at: string
  appIds: string[]
  // Add additional properties as needed.
}
