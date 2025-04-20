
export function useProductMetrics() {
  const { productCollection } = useProducts()

  return {
    totalProducts: computed(() => productCollection.value?.length ?? 0),
    activeProducts: computed(
      () =>
        productCollection.value?.filter(product => product.active).length ?? 0
    ),
    outOfStockProducts: computed(
      () =>
        productCollection.value?.filter(product => product.stock === 0)
          .length ?? 0
    ),
    physicalProducts: computed(
      () =>
        productCollection.value?.filter(
          product => product.productType === 'physical'
        ).length ?? 0
    ),
    digitalProducts: computed(
      () =>
        productCollection.value?.filter(
          product => product.productType === 'digital'
        ).length ?? 0
    ),
    serviceProducts: computed(
      () =>
        productCollection.value?.filter(
          product => product.productType === 'service'
        ).length ?? 0
    )
  }
}
