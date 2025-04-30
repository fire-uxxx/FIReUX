<!-- app/components/organisms/Product/Create/Write.vue -->
<template>
  <div class="write-system">
    <!-- Basic -->
    <OrganismsProductCreateBasic />
    <!-- Stock Management -->
    <OrganismsProductCreateStock />
    <!-- Prices (Stripe-style) -->
    <OrganismsProductCreatePrices />
    <OrganismsProductCreateAdvanced />
    <OrganismsProductCreateImages />
  </div>
</template>
