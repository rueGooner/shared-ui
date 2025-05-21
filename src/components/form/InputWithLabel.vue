<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label :for="id" class="text-secondary font-bold">{{ label }}</Label>
    <Input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="border border-secondary focus:border-secondary/80 rounded focus:ring-1 focus:ring-secondary/80 block w-full px-3 py-2 text-sm placeholder:text-gray-400 bg-white text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/80 focus-visible:ring-offset-1 aria-invalid:border-destructive aria-invalid:text-destructive-foreground dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-400 dark:border-secondary dark:focus:border-secondary/80 dark:focus:ring-secondary/80 dark:focus-visible:ring-secondary/80 dark:aria-invalid:border-destructive dark:aria-invalid:text-destructive-foreground"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";

defineProps<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
