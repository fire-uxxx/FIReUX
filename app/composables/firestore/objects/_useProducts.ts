export function useProducts() {
  return {
    ...useProductFetch(),
    ...useProductCreate(),
    // ...useProductDelete(),
    // ...useProductUpdate()
  }
}
