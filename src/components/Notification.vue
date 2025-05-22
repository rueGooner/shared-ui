<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed top-4 left-4 p-4 rounded text-primary z-50" role="alert" aria-live="assertive"
      aria-atomic="true">
      NOTIFICATION
      <button class="" @click="handleClose">close</button>
      <div v-if="Array.isArray(messages)">
        <p v-for="(message, index) in visibleMessages" :key="index" :class="[
          'p-2 rounded my-2 shadow-lg min-w-xl',
          notificationType === 'success' ? 'bg-green-100 text-green-800 border border-green-800' : '',
          notificationType === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-800' : '',
          notificationType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-800' : '',
          notificationType === 'error' ? 'bg-red-100 text-red-800 border border-red-800' : '',
        ]">
          {{ capitalize(message) }}.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, capitalize } from "vue";

interface NotificationProps {
  messages: string[];
  duration?: number;
  notificationType: "success" | "warning" | "info" | "error";
}

const isVisible = ref<boolean>(false);
const visibleMessages = ref<string[]>([]);

const emit = defineEmits<{
  (e: "closed"): void;
}>();

const props = defineProps<NotificationProps>();

const handleClose = () => {
  isVisible.value = false;
  visibleMessages.value = [];
  emit("closed");
};

watch(
  () => props.messages,
  (newMessages) => {
    if (newMessages.length > 0) {
      isVisible.value = true;
      visibleMessages.value = [];

      newMessages.forEach((msg, index) => {
        setTimeout(() => {
          visibleMessages.value.push(msg);
        }, 300 * index);
      });

      setTimeout(() => {
        handleClose();
      }, props.duration ?? 3000 + newMessages.length * 300);
    }
  },
  { immediate: true }
);
</script>
