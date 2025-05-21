<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <Button variant="link" asChild>
      <RouterLink to="/login">Login Page</RouterLink>
    </Button>
    <RouterView />
</template>

<style scoped>

</style>
