export function useProducts() {

    function generateSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }
  return {
    ...useProductFetch(),
    ...useProductCreate(),
    generateSlug,
    // ...useProductDelete(),
    // ...useProductUpdate()
  }
}
