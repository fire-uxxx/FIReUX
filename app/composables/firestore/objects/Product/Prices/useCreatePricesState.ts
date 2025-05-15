// ~/composables/admin/useCreatePricesState.ts
import { useStorage } from '@vueuse/core'

export function useCreatePricesState() {
  const prices = useStorage<Partial<Price>[]>('createProductPrices', [
    {
      unit_amount: 0,
      currency: 'eur'
    }
  ])

  function addPrice() {
    prices.value.push({
      unit_amount: 0,
      currency: 'eur'
    })
  }

  function removePrice(index: number) {
    prices.value.splice(index, 1)
  }

  function resetPrices() {
    prices.value = [
      {
        unit_amount: 0,
        currency: 'eur'
      }
    ]
  }

  function resetCreatePricesState() {
    resetPrices()
  }

  const pricesPayload = computed<StripePriceInput[]>(() => {
    if (!prices.value.length) {
      throw new Error('❌ At least one price is required.')
    }

    return prices.value.map((p, i) => {
      if (!p.unit_amount || p.unit_amount <= 0) {
        throw new Error(
          `❌ Price at index ${i} is missing a valid unit_amount.`
        )
      }
      if (!p.currency) {
        throw new Error(`❌ Price at index ${i} is missing a currency.`)
      }

      return {
        billing_scheme: p.billing_scheme ?? 'per_unit',
        currency: p.currency,
        unit_amount: p.unit_amount,
        type: p.type ?? 'one_time',
        interval: p.type === 'recurring' ? p.interval ?? 'month' : undefined,
        interval_count:
          p.type === 'recurring' ? p.interval_count ?? 1 : undefined,
        metadata: p.metadata ?? {}
      }
    })
  })

  return {
    prices,
    addPrice,
    removePrice,
    resetPrices,
    resetCreatePricesState,
    pricesPayload
  }
}
