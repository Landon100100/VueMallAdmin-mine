<template>
  <div class="product-edit-container">
    <Product :mode="'add'"></Product>
  </div>
</template>

<script>
import Product from './components/product.vue';

export default {
  name: 'ProductAdd',
  components: {
    Product,
  },
};
</script>

<style></style>
