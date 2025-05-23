import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useRuntimeConfig } from '#app'

export function useFirestoreUtils() {
  const db = useFirestore()
  const { public: { tenantId } } = useRuntimeConfig()

  async function checkUnique(
    collectionName: string,
    field: string,
    value: string,
    tenantScoped = true
  ): Promise<boolean> {
    const constraints = [where(field, '==', value)]
    if (tenantScoped) {
      constraints.push(where('tenant_id', '==', tenantId))
    }
    const q = query(collection(db, collectionName), ...constraints)
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  return { checkUnique }
}
