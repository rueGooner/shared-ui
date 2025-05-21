<template>
  <form
    @submit.prevent="login"
    class="max-w-md mx-auto p-6 space-y-6 text-secondary"
  >
    <h1 class="text-2xl font-bold">Login Page</h1>

    <InputWithLabel
      id="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      v-model="email"
    />
    <InputWithLabel
      id="password"
      label="Password"
      type="password"
      placeholder="**********"
      v-model="password"
    />
    <Button
      variant="secondary"
      class="rounded"
      type="submit"
      :disabled="isLoading"
    >
      <span v-if="isLoading">Logging in...</span>
      <span v-else>Login</span>
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import InputWithLabel from "@/components/form/InputWithLabel.vue";
import Button from "@/components/ui/button/Button.vue";

const { handleLogin, isLoading } = useAuth();
const email = ref("");
const password = ref("");

const login = () => {
  handleLogin({
    email: email.value,
    password: password.value,
  });
};
</script>
