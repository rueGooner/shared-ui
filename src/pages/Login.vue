<template>
  <div>
    LOGIN PAGE
    <Button variant="default" class="rounded">BACK</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import Button from "@/components/ui/button/Button.vue";

const { handleLogin } = useAuth();
const email = ref("");
const password = ref("");

const login = () => {
  handleLogin({
    email: email.value,
    password: password.value,
  });
};
</script>
