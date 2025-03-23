import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore'

const db = getFirestore()

export function useProducts() {
  async function createProduct(productData) {
    const newProduct = await addDoc(collection(db, 'products'), {
      ...productData,
      timestamp: new Date().toISOString()
    })
    return newProduct.id
  }

  async function updateProduct(productId, updateData) {
    const productRef = doc(db, 'products', productId)
    await updateDoc(productRef, {
      ...updateData,
      updatedAt: new Date().toISOString()
    })
  }

  async function deleteProduct(productId) {
    const productRef = doc(db, 'products', productId)
    await deleteDoc(productRef)
  }

  async function getProducts(limitCount) {
    const productsRef = collection(db, 'products')
    let q
    if (limitCount) {
      q = query(productsRef, orderBy('timestamp', 'desc'), limit(limitCount))
    } else {
      q = query(productsRef, orderBy('timestamp', 'desc'))
    }
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  }

  return { createProduct, updateProduct, deleteProduct, getProducts }
}
