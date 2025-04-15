// composables/admin/useAdminMetrics.ts
import { useFirestore as vuefireFirestore, useFirestoreCount } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'

export function useAdminMetrics() {
  const db = vuefireFirestore()
  const usersCollection = collection(db, 'users')

  // Using vuefire's composable to reactively bind count queries
  // Count users with a 'standard' subscription
  const standardCount = useFirestoreCount(
    query(usersCollection, where('subscription.plan', '==', 'standard'))
  )

  // Count users with a 'pro' subscription
  const proCount = useFirestoreCount(
    query(usersCollection, where('subscription.plan', '==', 'pro'))
  )

  // Count users with no subscription (subscription field is null or not set)
  const noSubscriptionCount = useFirestoreCount(
    query(usersCollection, where('subscription', '==', null))
  )

  return {
    standardCount,
    proCount,
    noSubscriptionCount
  }
}
