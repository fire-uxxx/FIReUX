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
}

// ~/models/user.model.ts

// ~/models/user.model.ts
// export interface User {
//   id: string
//   display_name: string
//   handle: string
//   avatar: string
//   email: string
//   created_at: string
//   appIds: string[]
//   adminAppIds?: string[]
//   // Optional subscription field.
//   // If null or undefined, the user has no paid subscription.
//   subscription?: {
//     plan: 'standard' | 'pro'
//     started_at: string
//     // Additional fields such as expiration date or status can be added later.
//   } | null
// }