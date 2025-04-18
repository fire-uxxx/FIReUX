import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'


export function useSimpleAdminMetrics() {
  const db = useFirestore()

  // Reactive collections
  const { data: users } = useCollection<User>(collection(db, 'users'))
  const { data: products } = useCollection<Product>(collection(db, 'products'))
  const { data: blogs } = useCollection<BlogPost>(collection(db, 'blog'))

  // Computed counts
  const totalUsers = computed(() => users.value?.length ?? 0)
  const totalProducts = computed(() => products.value?.length ?? 0)
  const totalBlogs = computed(() => blogs.value?.length ?? 0)

  return {
    users,
    products,
    blogs,
    totalUsers,
    totalProducts,
    totalBlogs
  }
}
