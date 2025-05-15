// ~/composables/admin/useProductUpdate.ts

export function useProductUpdate() {
  const { updateFirestoreDocument } = useFirestoreUpdate()

  async function updateProduct(
    id: string,
    updates: Partial<FirebaseProduct>
  ): Promise<void> {
    if (!id) {
      throw new Error('Product ID is required for update.')
    }

    await updateFirestoreDocument('products', id, updates)
  }

  return { updateProduct }
}
