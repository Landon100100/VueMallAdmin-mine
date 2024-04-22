<template>
  <div class="product-edit-container">
    <Product :mode="'edit'"></Product>
  </div>
</template>

<script>
import Product from './components/product.vue';

export default {
  name: 'ProductEdit',
  components: {
    Product,
  },
};
</script>

<style></style>
