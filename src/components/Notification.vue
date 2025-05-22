<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="fixed top-4 left-4 p-4 rounded text-primary z-50 shadow-lg"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      NOTIFICATION
      <button class="" @click="handleClose">close</button>
    </div></transition
  >
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

interface NotificationProps {
  messages: string[];
  duration?: number;
  notificationType: "success" | "warning" | "info" | "error";
}

const isVisible = ref<boolean>(false);

const emit = defineEmits<{
  (e: "closed"): void;
}>();

const props = defineProps<NotificationProps>();

const handleClose = () => {
  isVisible.value = false;
  emit("closed");
};

watch(
  () => props.messages,
  (newMsg) => {
    if (newMsg.length > 0) {
      isVisible.value = true;
      setTimeout(() => {
        handleClose();
      }, props.duration ?? 3000);
    }
  },
  { immediate: true },
);
</script>
